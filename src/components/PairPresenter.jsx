import React from 'react';

// Assuming a similar Button component as defined in ListEntry.jsx or a shared one
const Button = ({ onClick, children, primary, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    // Added a default class for styling if not provided
    className={`button ${primary ? 'primary' : ''} ${className}`}
  >
    {children}
  </button>
);


const PairPresenter = ({ pair, onSubmit }) => {
  // pair is an array of two objects: [{index, item}, {index, item}]
  // onSubmit should be called with the original index of the winning item

  const handleSelect = (selectedIndexInPair) => {
    if (onSubmit && pair && pair[selectedIndexInPair]) {
      onSubmit(pair[selectedIndexInPair].index); // Pass the original index of the item
    }
  };

  if (!pair || pair.length !== 2) {
    return <p>Invalid pair provided.</p>; // Or some other placeholder/error
  }

  return (
    <>
      <div className="pair-presenter-row">
        {pair.map(({ item, index }, i) => ( // item is the text, index is its original index
          <div className="pair-presenter-item" key={index}> {/* Use original index for key if items are unique */}
            <p>{item}</p>
            <Button onClick={() => handleSelect(i)}>Select</Button>
          </div>
        ))}
      </div>
      <style jsx global>{`
        .pair-presenter-row {
          display: flex;
          flex-direction: row;
          justify-content: stretch; /* Distribute space evenly if items are of different sizes */
          align-items: stretch; /* Make items same height */
          margin-bottom: 1rem; /* Add some space below the pair */
        }
        .pair-presenter-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          width: 50%; /* Each item takes half the width */
          min-width: 150px; /* Minimum width before wrapping or shrinking too much */
          justify-content: space-between; /* Pushes button to bottom if text is short */
          border: 1px solid var(--color-lightGrey, #d2d6dd); /* Add a light border */
          border-radius: 0.25rem; /* Rounded corners */
          margin: 0 5px; /* Add small margin between items */
        }
        .pair-presenter-item:first-child {
          margin-left: 0;
        }
        .pair-presenter-item:last-child {
          margin-right: 0;
        }
        .pair-presenter-item p {
          text-align: center;
          margin-bottom: 10px; /* Space between text and button */
          flex-grow: 1; /* Allows text to take available space, helping align buttons */
          word-break: break-word; /* Prevent long text from breaking layout */
        }
        .pair-presenter-item .button {
          width: 100%; /* Make button take full width of its container */
          padding: 0.75rem 1rem; /* Adjust padding as needed */
        }

        /* Re-include basic button styles if not globally available or imported */
        /* For brevity, assuming .button styles from ListEntry.jsx are applied or similar global styles exist */
        /* If not, copy the .button, .button.primary, etc. styles here or into a global CSS file */
      `}</style>
    </>
  );
};

export default PairPresenter;
