import React from 'react';
import ListEntry from '../components/ListEntry'; // Assuming ListEntry.jsx is in this path

const EnterCriteriaStep = (props) => {
  // Forwarding props and slot content similar to EnterOptionsStep

  const titleSlot = <h3>Step 2 of 4: Enter Criteria</h3>;
  const descriptionSlot = (
    <p>
      Please enter the criteria you wish to use to evaluate your options,
      such as "cost" or "time required". (Enter at least one.)
    </p>
  );
  // The Svelte version didn't explicitly set minLength, but ListEntry default is 1.
  // We can be explicit here if needed, or rely on the default in ListEntry.jsx
  return (
    <ListEntry
      placeholder="Criteria text"
      onSubmit={props.onSubmit}
      submitButtonText="Next"
      minLength={1} // Explicitly setting, matches ListEntry's default
      titleSlot={titleSlot}
      descriptionSlot={descriptionSlot}
    />
  );
};

export default EnterCriteriaStep;
