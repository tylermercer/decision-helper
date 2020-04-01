import { div, h3, button, SimpleObservable, p } from "markup-as-js";
import { ScoredItem } from "../types";

type Props = {
  scoredOptions: ScoredItem[][],
  scoredCriteria: ScoredItem[],
}

const computeResults = (options: ScoredItem[][], criteria: ScoredItem[]): ScoredItem[] => {
  let res = options[0].map(({text}) => ({text, score: 0}));
  for (var c in criteria) {
    for (var o in options[0]) {
      res[o].score += options[c][o].score * (1 + criteria[c].score * 4);
    }
  }
  res.sort((a, b) => b.score - a.score);
  return res;
}

const ResultsStep = ({
  scoredCriteria,
  scoredOptions
}:Props) => {

  const showScores = new SimpleObservable<boolean>(false);
  const showScoresBtnText = new SimpleObservable<string>("Show Scores");
  showScores.subscribe(
    v => showScoresBtnText.set(v ? "Show Scores" : "Hide Scores")
  );

  const toggleShowScores = () => {
    showScores.set(!showScores.value);
  };

  const results = computeResults(scoredOptions, scoredCriteria);

  return div(
    h3("Results"),
    div({class:"results"},
      ...results.map(({text, score}:ScoredItem, i:number):HTMLElement => p(
        {class: `result-item${!i?' result-first primary-text':''}`},
        `${i + 1}. ${text}`,
        //TODO: show scores
      ))
    ),
    button({class:"button primary outline", onclick:toggleShowScores}, showScoresBtnText)
  );
}

export default ResultsStep;