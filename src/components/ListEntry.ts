import { div, span, button, input, SimpleObservable } from "markup-as-js"

type Props = {
  submitButtonText: string, 
  minLength: number, 
  placeholder: string, 
  entries: SimpleObservable<string[]>,
  onSubmit: () => void
}

const ListEntry = (
  {
    submitButtonText,
    minLength,
    placeholder,
    entries,
    onSubmit
  }:Props,
  title: HTMLElement,
  description: HTMLElement
) => {

  const text = new SimpleObservable("");
  const addDisabled = new SimpleObservable(true);
  const submitDisabled = new SimpleObservable(true);
  text.subscribe(v => addDisabled.set(!v));
  entries.subscribe(v => submitDisabled.set(v.length < minLength));

  const deleteItem = (i:number, item:HTMLElement) => {
    entriesContainer.removeChild(item);
    entries.set(entries.value.slice(0, i).concat(entries.value.slice(i + 1)));
  }

  const addEntry = () => {
    entriesContainer.appendChild(renderItem(text.value, entries.value.length));
    entries.set([...entries.value, text.value]);
    text.set("");
    (entryInput as HTMLElement as HTMLInputElement).value = "";
    entryInput.focus();
  }

  const handleInput = (e: InputEvent) => {
    text.set((e.target as any).value);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    addEntry();
  };

  const renderItem = (e: string, i:number) => {
    const item = div(
      {class:"row"},
      span({class:"entry-text"}, e),
      button({class:"button outline", onclick:() => deleteItem(i, item)}, "Delete")
    );
    return item;
  }

  const entryInput = input({
    placeholder,
    onkeydown: handleEnter,
    oninput: handleInput,
    autofocus: true
  });

  const entriesContainer = div({id: "entries"}, ...entries.value.map(renderItem));

  return div(
    title,
    description,
    entriesContainer,
    div({id: "input-field", class:"input-field field gapless grouped"},
      entryInput,
      button(
        {
          class: "button primary",
          onclick: addEntry,
          disabled: addDisabled,
        },
        "Add"
      )
    ),
    button(
      {
        class: "button primary pull-right", 
        disabled: submitDisabled,
        onclick: onSubmit
      },
      submitButtonText
    )
  );
}

export default ListEntry;