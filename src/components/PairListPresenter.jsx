import React, { useState, useEffect, useMemo } from 'react';
import pairsFromArray from '../utils/pairsFromArray'; // Assuming this is a JS file and can be imported directly
import PairPresenter from './PairPresenter'; // Assuming this will be migrated
import Fade from './Fade'; // Assuming this is already migrated

const PairListPresenter = ({ items = [], onDone }) => {
  const [scoredItems, setScoredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize scoredItems when items prop changes
  useEffect(() => {
    setScoredItems(items.map(itemText => ({ text: itemText, score: 0 })));
    setCurrentIndex(0); // Reset index when items change
  }, [items]);

  // Memoize pairedItems to avoid recalculating on every render unless items change
  const pairedItems = useMemo(() => {
    if (!items || items.length < 2) return [];
    return pairsFromArray(items);
  }, [items]);

  const handleScore = (winnerIndex) => {
    // `winnerIndex` here is the original index of the item in the `items` array.
    // We need to find which of our `scoredItems` corresponds to this.
    // `PairPresenter` should return the original index of the winning item.
    // Create the next state for scoredItems based on the current state and the winner
    const nextScoredItems = scoredItems.map((item, index) => {
      if (index === winnerIndex) {
        return { ...item, score: item.score + 1 };
      }
      return item;
    });
    setScoredItems(nextScoredItems);

    if (currentIndex + 1 === pairedItems.length) {
      if (onDone) {
        // Use nextScoredItems for normalization as it's the most up-to-date
        const normalizedScores = nextScoredItems.map(e => ({
          ...e,
          // Score is the percentage of relevant pairs that this item won
          // An item is part of (items.length - 1) pairs
          score: items.length > 1 ? e.score / (items.length - 1) : 0,
        }));
        onDone(normalizedScores);
      }
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  // Effect for handling cases with less than 2 items (no pairs to form)
  useEffect(() => {
    if (items.length < 2) {
      if (onDone) {
        if (items.length === 1) {
          // Ensure scoredItems is initialized before calling onDone
          const singleItemScore = [{ text: items[0], score: 1 }];
          setScoredItems([{text: items[0], score: 0}]); // Initialize for consistency, though score is overridden
          onDone(singleItemScore);
        } else {
          setScoredItems([]); // Initialize for consistency
          onDone([]);
        }
      }
      // No pairs to present, so we can return early from the component render logic
    }
  }, [items, onDone]);

  if (items.length < 2) {
    return <p>{items.length === 0 ? "No items to compare." : "Only one item, no comparison needed."}</p>;
  }

  if (!pairedItems || pairedItems.length === 0) {
    // This case should ideally be covered by items.length < 2,
    // but as a fallback or if pairsFromArray returns empty for other reasons:
    return <p>Loading pairs or not enough items to compare...</p>;
  }


  // Svelte's {#each [index] as index (index)} trick for re-rendering Fade and PairPresenter
  // In React, we achieve this by providing a unique `key` to the component when we want it to remount.
  // The Fade component itself handles its in/out animation based on its props or internal state.
  // We need to ensure PairPresenter gets the current pair.

  const currentPair = pairedItems[currentIndex];

  return (
    // The key on Fade ensures it re-animates when currentIndex changes.
    <Fade key={currentIndex}>
      <PairPresenter
        // pair is an array of two objects: [{index, item}, {index, item}]
        pair={currentPair}
        onSubmit={handleScore} // onSubmit should be called with the original index of the winning item
      />
    </Fade>
  );
};

export default PairListPresenter;
