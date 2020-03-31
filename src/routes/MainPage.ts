import { p, SimpleObservable, h3, div } from "markup-as-js";
import EnterOptionsStep from "../steps/EnterOptionsStep";

interface ViewBuilderSet {
  [index: number]: () => HTMLElement
}

const Main = () => {
  
  const options = new SimpleObservable<string[]>([]);
	let criteria = [];
	let scoredCriteria = [];
	let scoredOptions = [];
  const currentPageNumber = new SimpleObservable(0);
  const currentPage = new SimpleObservable(p("loading"));

  const next = (n:number = 1) => {
    //Handle next
    console.log(options.value);
    currentPageNumber.set(n);
  }

  const buildErrorView = () => div(
    h3("Oh no"),
    p("Something broke. Please refresh the page")
  );
  
  const viewBuilders: ViewBuilderSet = {
    0: () => EnterOptionsStep({ options, onSubmit: next}),
  }

  currentPageNumber.subscribe(
    v => currentPage.set((viewBuilders[v] || buildErrorView)())
  );
  
  return div(currentPage);
}

export default Main;