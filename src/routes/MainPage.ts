import { p, SimpleObservable, h3, div } from "markup-as-js";
import ListEntry from '../components/ListEntry';

const Main = () => {
  
  let options = new SimpleObservable<string[]>([]);
	let criteria = [];
	let scoredCriteria = [];
	let scoredOptions = [];
  let currentPage = 0;

  const next = (n = 1) => {
    //Handle next
  }
  
  const getCurrentView = (page: number) => {
    switch (page) {
      case 0:
        return ListEntry(
          {
            placeholder: "Option text",
            onSubmit: next,
            entries: options,
            minLength: 2,
            submitButtonText: "Next"
          },
          h3("Step 1 of 4: Enter Options"),
          p("Please enter the options you're deciding between. (Enter at least two.)")
        );
      default:
        return div(
          h3("Oh No"),
          p("Something went wrong. Please refresh the page")
        )
    }
  }
  
  return getCurrentView(currentPage);
}

export default Main;