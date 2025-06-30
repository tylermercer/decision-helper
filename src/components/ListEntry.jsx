import React, { useState, useRef } from 'react';

// Basic Button component (can be expanded or moved to a shared components folder)
const Button = ({ onClick, children, primary, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`button ${primary ? 'primary' : 'outline'} ${className}`}
  >
    {children}
  </button>
);

// Basic Field component (can be expanded or moved)
const Field = ({ children, grouped, gapless }) => (
  <div className={`field ${grouped ? 'grouped' : ''} ${gapless ? 'gapless' : ''}`}>
    {children}
  </div>
);

const ListEntry = ({
  submitButtonText = "Submit",
  minLength = 1,
  placeholder = "Your text here...",
  onSubmit,
  titleSlot,
  descriptionSlot,
  emptySlot
}) => {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState("");
  const inputRef = useRef(null);

  const addEntry = () => {
    if (!entry.trim()) return;
    setEntries(prevEntries => [...prevEntries, entry.trim()]);
    setEntry("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const submitEntries = () => {
    if (onSubmit) {
      onSubmit(entries);
    }
  };

  const deleteItem = i => {
    setEntries(prevEntries => prevEntries.filter((_, index) => index !== i));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if it's part of a form
      addEntry();
    }
  };

  return (
    <div>
      {titleSlot}
      {descriptionSlot}
      {entries.length === 0 && emptySlot}
      {entries.map((item, i) => (
        <div className="row list-entry-item" key={i}>
          <span className="entry-text">{item}</span>
          <Button onClick={() => deleteItem(i)} className="outline">Delete</Button>
        </div>
      ))}
      <Field grouped gapless>
        <input
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          value={entry}
          onChange={e => setEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flexGrow: 1, marginRight: grouped && gapless ? 0 : '0.5rem' }}
        />
        <Button primary onClick={addEntry} disabled={!entry.trim()}>Add</Button>
      </Field>
      <Button
        className="pull-right"
        primary
        disabled={entries.length < minLength}
        onClick={submitEntries}
        style={{ marginTop: '1rem' }}
      >
        {submitButtonText}
      </Button>
      <style jsx global>{`
        .list-entry-item .entry-text { /* More specific selector */
          padding-right: 10px;
          flex: 1;
          text-align: left;
          word-break: break-word; /* Prevent long text from breaking layout */
        }
        .list-entry-item.row { /* More specific selector */
          border-top: 1px solid var(--color-lightGrey, #d2d6dd);
          display: flex;
          margin: 4px 0;
          align-items: center;
          padding: 0.5rem 0; /* Add some padding */
        }
        .list-entry-item.row button { /* More specific selector */
          margin: 0; /* Adjusted from 10px 0 to better fit flex layout */
          padding: 0.5rem 1rem; /* Ensure buttons have decent size */
        }

        /* Basic styles for Button and Field, inspired by chota and general principles */
        .button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          font-size: 1rem; /* Original was 1.6rem based on root, adjusted for component */
          text-align: center;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 0.25rem;
          background-color: var(--color-lightGrey, #d2d6dd);
          color: var(--color-darkGrey, #3f4144);
          text-decoration: none;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
        }
        .button:hover {
          opacity: 0.8;
        }
        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
        .button.pull-right {
          float: right;
        }

        .field {
          margin-bottom: 1rem;
        }
        .field.grouped {
          display: flex;
          align-items: center;
        }
        .field.grouped > input {
          flex-grow: 1;
          /* Assuming gapless means no margin between input and button */
        }
        .field.grouped.gapless > input {
           margin-right: 0;
           border-top-right-radius: 0;
           border-bottom-right-radius: 0;
        }
        .field.grouped.gapless > .button {
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
        }

        input[type="text"] {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid var(--color-lightGrey, #d2d6dd);
          border-radius: 0.25rem;
          box-sizing: border-box; /* Ensure padding doesn't increase size */
        }
        input[type="text"]:focus {
          border-color: var(--color-primary, #00419c);
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 65, 156, 0.2); /* Focus ring */
        }
      `}</style>
    </div>
  );
};

export default ListEntry;
