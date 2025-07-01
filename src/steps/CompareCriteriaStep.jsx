import React from 'react';
import PairListPresenter from '../components/PairListPresenter'; // Assuming PairListPresenter.jsx

const CompareCriteriaStep = ({ criteria, onDone }) => {
  // The on:done event in Svelte becomes an onDone prop in React.
  // We pass it directly to the PairListPresenter component.

  return (
    <div>
      <h3>Step 3 of 4: Rank Criteria</h3>
      <p>Which of these two criteria is more important?</p>
      <PairListPresenter
        items={criteria}
        onDone={onDone} // Forward the onDone prop
      />
    </div>
  );
};

export default CompareCriteriaStep;
