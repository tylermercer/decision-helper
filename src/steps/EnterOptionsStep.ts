import { p, SimpleObservable, h3 } from "markup-as-js";
import ListEntry from '../components/ListEntry';

type Props = {
  onSubmit: () => void,
  options: SimpleObservable<string[]>
}

const EnterOptionsStep = ({
  onSubmit,
  options
}:Props) => {
  return ListEntry(
    {
      placeholder: "Option text",
      onSubmit,
      entries: options,
      minLength: 2,
      submitButtonText: "Next"
    },
    h3("Step 1 of 4: Enter Options"),
    p("Please enter the options you're deciding between. (Enter at least two.)")
  );
}

export default EnterOptionsStep;