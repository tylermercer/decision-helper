import React, { useState, useMemo } from 'react';
import Fade from '../components/Fade'; // Assuming Fade.jsx is available

// Basic Button component (can be expanded or moved to a shared components folder)
// Copied from ListEntry.jsx - ideally this would be a shared component
const Button = ({ onClick, children, primary, outline, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`button ${primary ? 'primary' : ''} ${outline ? 'outline' : ''} ${className}`}
  >
    {children}
  </button>
);

const ResultsStep = ({ scoredCriteria, scoredOptions }) => {
  const [showScores, setShowScores] = useState(false);

  const round = num => +(Math.round(num + "e+2") + "e-2");

  const computeResults = (options, criteria) => {
    if (!options || !criteria || options.length === 0 || criteria.length === 0 || !options[0]) {
      return [];
    }
    // Initialize results with text from the first set of options scores, and score 0
    let res = options[0].map(({ text }) => ({ text, score: 0 }));

    // criteria is an array of {item: string, score: number}
    // options (scoredOptions) is an array of arrays. Each inner array corresponds to a criterion.
    // Each element in the inner array is {item: string, score: number} or {text: string, score: number}
    // The Svelte code uses `options[c][o]`, implying `options` is indexed by criterion index `c`.
    // And `criteria[c]` implies criteria is also an array.
    // Let's ensure this mapping is correct.
    // `scoredOptions` from App.svelte is `handleOptionsScores` which is an array of arrays of scores.
    // `scoredCriteria` from App.svelte is `handleCriteriaScores` which is an array of {item, score}.

    for (let c = 0; c < criteria.length; c++) {
      // options[c] should be the array of option scores for the c-th criterion
      if (options[c]) {
        for (let o = 0; o < options[c].length; o++) {
          // Ensure `res[o]` exists. This assumes `options[c]` has the same length
          // and order as `options[0]` used for initialization.
          if (res[o] && options[c][o]) {
            // The Svelte code had `criteria[c].score`. Assuming `item` is text, `score` is the value.
            // The Svelte code had `options[c][o].score`.
            // The multiplier `(1 + criteria[c].score * 4)` gives more weight to higher-scored criteria.
            // A criterion score of 0 means multiplier is 1.
            // A criterion score of 1 (max) means multiplier is 5.
            res[o].score += options[c][o].score * (1 + criteria[c].score * 4);
          }
        }
      }
    }
    res.sort((a, b) => b.score - a.score);
    return res;
  };

  const results = useMemo(() => computeResults(scoredOptions, scoredCriteria), [scoredOptions, scoredCriteria]);

  return (
    <div>
      <h3>Results</h3>
      <div className="results-list">
        {results.map(({ text, score }, i) => (
          <p
            key={i}
            className={`results-item ${i === 0 ? 'first primary-text' : ''}`}
          >
            <span>{i + 1}. </span>
            {text}
            {showScores && (
              <Fade duration={200}> {/* Apply Fade to the score part */}
                <span className="text-grey">
                  {` (${round(score)})`}
                </span>
              </Fade>
            )}
          </p>
        ))}
      </div>
      <Button outline primary onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide" : "Show"} Scores
      </Button>
      <p style={{ marginTop: '1rem' }}><a href="/">Reset</a></p>
      <style jsx global>{`
        .results-list {
          margin-bottom: 24px;
        }
        .results-item {
          margin-bottom: 4px;
          line-height: 1.5; /* Improve readability */
        }
        .results-item.first {
          font-size: 150%;
        }
        .results-item.primary-text {
           /* Assuming primary-text color is defined globally, e.g., var(--color-primary) */
           color: var(--color-primary, #00419c);
        }
        .text-grey {
          color: var(--color-grey, #747681);
          font-size: 0.9em; /* Slightly smaller for the score */
        }
        /* Basic Button styles (ensure these are defined globally or imported if Button is from a shared file) */
        .button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          text-align: center;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 0.25rem;
          background-color: var(--color-lightGrey, #d2d6dd);
          color: var(--color-darkGrey, #3f4144);
        }
        .button:hover {
          opacity: 0.8;
        }
        .button.primary {
          background-color: var(--color-primary, #00419c);
          color: white;
          border-color: var(--color-primary, #00419c);
        }
        .button.outline {
          background-color: transparent;
          color: var(--color-primary, #00419c);
          border-color: var(--color-primary, #00419c);
        }
        .button.outline:hover {
          background-color: var(--color-primary, #00419c);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ResultsStep;
