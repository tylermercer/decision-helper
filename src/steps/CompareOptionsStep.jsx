import React from 'react';
import PairListCrossPresenter from '../components/PairListCrossPresenter'; // Assuming PairListCrossPresenter.jsx

const CompareOptionsStep = ({ criteria, options, onDone }) => {
  // The on:done event in Svelte becomes an onDone prop in React.

  return (
    <div>
      <h3>Step 4 of 4: Rank Options by Criteria</h3>
      <PairListCrossPresenter
        prompts={criteria} // In Svelte this was `criteria`, but PairListCrossPresenter expects `prompts`
        items={options}
        onDone={onDone} // Forward the onDone prop
      />
    </div>
  );
};

export default CompareOptionsStep;
