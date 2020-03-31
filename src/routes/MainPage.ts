import { p, SimpleObservable, h3, div } from "markup-as-js";
import EnterOptionsStep from "../steps/EnterOptionsStep";

interface PageBuilderSet {
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

  const buildErrorPage = () => div(
    h3("Oh no"),
    p("Something broke. Please refresh the page")
  );
  
  const pageBuilders: PageBuilderSet = {
    0: () => EnterOptionsStep({ options, onSubmit: next}),
  }

  currentPageNumber.subscribe(
    v => currentPage.set((pageBuilders[v] || buildErrorPage)())
  );
  
  return div(currentPage);
}

export default Main;