import { div, SimpleObservable } from "markup-as-js";
import { ScoredItem } from "../types";

type Props = {
  scoredOptions: SimpleObservable<ScoredItem[][]>,
  options: SimpleObservable<string[]>,
  onSubmit: () => void
}

const CompareOptionsStep = ({
  scoredOptions,
  options
}:Props) => {
  return div("foo");
}

export default CompareOptionsStep;