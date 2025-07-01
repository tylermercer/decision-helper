import React, { useState, useEffect } from 'react';

// Import React step components (adjust paths if App.jsx is in a different location than index.astro's script)
import EnterOptionsStep from '../steps/EnterOptionsStep';
import EnterCriteriaStep from '../steps/EnterCriteriaStep';
import CompareCriteriaStep from '../steps/CompareCriteriaStep';
import CompareOptionsStep from '../steps/CompareOptionsStep';
import ResultsStep from '../steps/ResultsStep';
import Fade from './Fade'; // Assuming Fade.jsx is in the same components directory

// Define React components directly for cleaner use
const EnterOptionsStepReact = (props) => React.createElement(EnterOptionsStep, props);
const EnterCriteriaStepReact = (props) => React.createElement(EnterCriteriaStep, props);
const CompareCriteriaStepReact = (props) => React.createElement(CompareCriteriaStep, props);
const CompareOptionsStepReact = (props) => React.createElement(CompareOptionsStep, props);
const ResultsStepReact = (props) => React.createElement(ResultsStep, props);
const FadeReact = (props) => React.createElement(Fade, props);

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [options, setOptions] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [scoredCriteria, setScoredCriteria] = useState([]);
  const [scoredOptions, setScoredOptions] = useState([]);

  const next = (n = 1) => setCurrentPage(prev => prev + n);

  const handleOptionsSubmit = (submittedOptions) => {
    setOptions(submittedOptions);
    next();
  };

  const handleCriteriaSubmit = (submittedCriteria) => {
    setCriteria(submittedCriteria);
    if (submittedCriteria.length === 1) {
      // Ensure item property is named 'text' if ResultsStep expects that for criteria
      setScoredCriteria([{ text: submittedCriteria[0], score: 1 }]);
      next(2); // Skip CompareCriteriaStep
    } else {
      next();
    }
  };

  const handleCriteriaScores = (calculatedScores) => {
    setScoredCriteria(calculatedScores);
    next();
  };

  const handleOptionsScores = (calculatedScores) => {
    setScoredOptions(calculatedScores);
    next();
  };

  const resetApp = () => {
    setCurrentPage(0);
    setOptions([]);
    setCriteria([]);
    setScoredCriteria([]);
    setScoredOptions([]);
    // Optional: If a full page reload is desired, though usually not for SPA-like behavior
    // window.location.href = '/';
  };

  let CurrentStepComponent;
  let stepProps = {};

  if (currentPage === 0) {
    CurrentStepComponent = EnterOptionsStepReact;
    stepProps = { onSubmit: handleOptionsSubmit };
  } else if (currentPage === 1) {
    CurrentStepComponent = EnterCriteriaStepReact;
    stepProps = { onSubmit: handleCriteriaSubmit };
  } else if (currentPage === 2) {
    CurrentStepComponent = CompareCriteriaStepReact;
    stepProps = { criteria: criteria, onDone: handleCriteriaScores };
  } else if (currentPage === 3) {
    CurrentStepComponent = CompareOptionsStepReact;
    stepProps = { criteria: criteria, options: options, onDone: handleOptionsScores };
  } else if (currentPage === 4) {
    CurrentStepComponent = ResultsStepReact;
    stepProps = { scoredCriteria: scoredCriteria, scoredOptions: scoredOptions, onReset: resetApp };
  } else {
    CurrentStepComponent = () => (
      FadeReact({ children:
        React.createElement('div', null,
          React.createElement('h3', null, 'Oh No'),
          React.createElement('p', null, 'Something went wrong. Please refresh the page or reset.')
        )
      })
    );
  }

  const PageContent = React.createElement(FadeReact, { key: currentPage, duration: 400 },
    CurrentStepComponent ? React.createElement(CurrentStepComponent, stepProps) : null
  );

  return React.createElement('div', null,
    React.createElement('h1', null,
      React.createElement('a', { className: 'logo', href: '#', onClick: (e) => { e.preventDefault(); resetApp(); } }, 'Volit')
    ),
    React.createElement('p', null, 'A tool to make difficult decisions easier'),
    PageContent
  );
};

export default App;
