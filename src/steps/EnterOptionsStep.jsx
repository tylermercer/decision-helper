import React from 'react';
import ListEntry from '../components/ListEntry'; // Assuming ListEntry.jsx is in this path

const EnterOptionsStep = (props) => {
  // The on:submit event in Svelte becomes an onSubmit prop in React.
  // We pass it directly to the ListEntry component.
  // Slot content is passed as children or specific props.

  const titleSlot = <h3>Step 1 of 4: Enter Options</h3>;
  const descriptionSlot = <p>Please enter the options you're deciding between. (Enter at least two.)</p>;

  return (
    <ListEntry
      placeholder="Option text"
      onSubmit={props.onSubmit} // Forward the onSubmit prop
      submitButtonText="Next"
      minLength={2}
      titleSlot={titleSlot}
      descriptionSlot={descriptionSlot}
    />
  );
};

export default EnterOptionsStep;
