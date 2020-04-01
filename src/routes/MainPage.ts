import { p, SimpleObservable, h3, div, TeardownableHTMLElement } from "markup-as-js";
import EnterOptionsStep from "../steps/EnterOptionsStep";
import EnterCriteriaStep from "../steps/EnterCriteriaStep";
import CompareCriteriaStep from '../steps/CompareCriteriaStep';
import CompareOptionsStep from '../steps/CompareOptionsStep';
import { ScoredItem } from "../types";
import ResultsStep from "../steps/ResultsStep";

interface ViewBuilderSet {
  [index: number]: () => TeardownableHTMLElement
}

const Main = () => {
  
  const options = new SimpleObservable<string[]>([]);
	const criteria = new SimpleObservable<string[]>([]);
	const scoredCriteria = new SimpleObservable<ScoredItem[]>([]);
	const scoredOptions = new SimpleObservable<ScoredItem[][]>([]);
  const currentPageNumber = new SimpleObservable(0);
  const currentPage = new SimpleObservable<TeardownableHTMLElement>(p("loading"));

  const next = (n:number = 1) => {
    //TODO: Handle next
    console.log(options.value);
    currentPageNumber.set(currentPageNumber.value + n);
  }

  const buildErrorView = () => div(
    h3("We're Sorry"),
    p("Something broke. Please refresh the page.")
  );
  
  const viewBuilders: ViewBuilderSet = {
    0: () => EnterOptionsStep({ options, onSubmit: next}),
    1: () => EnterCriteriaStep({ criteria, onSubmit: next }),
    2: () => CompareCriteriaStep({ criteria, scoredCriteria, onSubmit: next }),
    3: () => CompareOptionsStep({ options, scoredOptions, onSubmit: next }),
    4: () => ResultsStep({ 
      scoredOptions: scoredOptions.value, 
      scoredCriteria: scoredCriteria.value 
    })
  }

  currentPageNumber.subscribe(
    v => {
      currentPage.value.teardown();
      currentPage.set((viewBuilders[v] || buildErrorView)());
    }
  );
  
  return div(currentPage);
}

export default Main;