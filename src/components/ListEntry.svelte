<script>
  import createId from '../uid.js';
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  let entries = [];

  let entry = "";

  const addEntry = () => {
    console.log("Foobar")
    entries =  entries.concat({
      text: entry,
      id: createId()
    });
    entry = "";
  }

  const submit = () => dispatch('submit', entries);

  const deleteItem = id => {
    entries = entries.filter(f => f.id !== id);
  }
</script>

<div>
  {#each entries as { text, id }}
    <div key={id}>
      <span class="entry">{text}</span><button on:click={() => deleteItem(id)}>Delete</button>
    </div>
  {/each}
  <div>
    <input placeholder="Option 1" bind:value={entry}/>
    <button on:click={addEntry} >Add</button>
  </div>
  <button on:click={submit}>Submit</button>
</div>

<style>
  input {
    display: inline;
  }
  .entry {
    box-shadow: none;
    background-color: green;
  }
</style>