import { div, SimpleObservable } from "markup-as-js";
import { ScoredItem } from "../types";

type Props = {
  scoredCriteria: SimpleObservable<ScoredItem[]>,
  criteria: SimpleObservable<string[]>,
  onSubmit: () => void
}

const CompareCriteriaStep = ({
  scoredCriteria,
  criteria
}:Props) => {
  return div("foo");
}

export default CompareCriteriaStep;