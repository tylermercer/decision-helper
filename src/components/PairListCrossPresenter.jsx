import React, { useState, useEffect } from 'react';
import PairListPresenter from './PairListPresenter'; // Assuming this will be migrated
import Fade from './Fade'; // Assuming this is already migrated

const PairListCrossPresenter = ({ items = [], prompts = [], onDone }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    // Reset scores if prompts or items change (optional, depends on desired behavior)
    setAllScores([]);
    setCurrentIndex(0);
  }, [prompts, items]);

  const handleRowComplete = (rowScores) => {
    const newScores = [...allScores, rowScores];
    setAllScores(newScores);

    if (currentIndex + 1 === prompts.length) {
      if (onDone) {
        onDone(newScores);
      }
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  if (prompts.length === 0) {
    return <p>No criteria (prompts) provided.</p>;
  }

  if (items.length === 0) {
    return <p>No items to compare.</p>;
  }

  // The Svelte {#each [index] as index (index)} is a "key block" trick
  // to force re-render of child components when `index` changes.
  // In React, changing the `key` prop on a component achieves a similar effect,
  // causing the component to unmount and remount.
  // We also need to manage the Fade component's visibility.

  return (
    <div>
      <p>Which one of these <i>best</i> meets the following criteria?</p>
      {prompts.map((prompt, idx) => (
        idx === currentIndex && (
          <Fade key={currentIndex}> {/* Key change will trigger Fade's remount/animation */}
            <p>"{prompt}"</p>
            <PairListPresenter
              items={items}
              onDone={handleRowComplete}
              // Pass a unique key to PairListPresenter if it also needs to reset its internal state
              // when the prompt changes. This depends on PairListPresenter's implementation.
              // key={`pair-list-${currentIndex}`}
            />
          </Fade>
        )
      ))}
    </div>
  );
};

export default PairListCrossPresenter;
