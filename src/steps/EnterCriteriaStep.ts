import { p, SimpleObservable, h3 } from "markup-as-js";
import ListEntry from '../components/ListEntry';

type Props = {
  onSubmit: () => void,
  criteria: SimpleObservable<string[]>
}

const EnterCriteriaStep = ({
  onSubmit,
  criteria
}:Props) => {
  return ListEntry(
    {
      placeholder: "Criteria text",
      onSubmit,
      entries: criteria,
      minLength: 2,
      submitButtonText: "Next"
    },
    h3("Step 2 of 4: Enter Criteria"),
    p("Please enter the criteria you wish to use to evaluate your options, such as \"cost\" or \"time required\"")
  );
}

export default EnterCriteriaStep;