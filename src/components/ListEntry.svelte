<script>
  import { createEventDispatcher } from 'svelte';
  import { Field, Button } from 'svelte-chota';

  export let submitButtonText = "Submit";

  export let minLength = 1;

  export let placeholder = "Your text here...";

	const dispatch = createEventDispatcher();

  let entries = [];

  let entry = "";

  let input;

  const addEntry = () => {
    if (!entry) return;
    entries =  entries.concat(entry);
    entry = "";
    input.focus();
  }

  const submit = () => dispatch('submit', entries);

  const deleteItem = i => {
    entries = entries.slice(0, i).concat(entries.slice(i + 1));
  }

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;
    addEntry();
  }

</script>

<div>
  <slot name="title"></slot>
  <slot name="description"></slot>
  {#each entries as entry, i (i)}
    <div class="row">
      <span class="entry-text">{entry}</span>
      <button class="button outline" on:click={() => deleteItem(i)}>Delete</button>
    </div>
  {:else}
    <slot name="empty"></slot>
  {/each}
  <Field gapless grouped>
    <!-- svelte-ignore a11y-autofocus -->
    <input 
      {placeholder} 
      bind:this={input}
      on:keydown="{handleEnter}" 
      bind:value={entry} 
      autofocus/>
    <Button 
      primary 
      on:click={addEntry} 
      disabled={!entry}>Add</Button>
  </Field>
  <Button
    class="pull-right"
    primary
    disabled={entries.length < minLength} 
    on:click={submit}>
    {submitButtonText}
  </Button>
</div>

<style>
  .entry-text {
    padding-right: 10px;
    flex: 1;
    text-align: left;
  }
  .row {
    display: flex;
    margin: 4px 0;
    align-items: center;
  }
</style>