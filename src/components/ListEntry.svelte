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
  <h1>Hello World!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  {#each entries as { text, id }, i (id)}
    <div key={id} class="row">
      <span class="entry-text">{text}</span><button on:click={() => deleteItem(id)}>Delete</button>
    </div>
  {/each}
  <div class="row">
    <input placeholder="Option 1" bind:value={entry}/>
    <button on:click={addEntry} >Add</button>
  </div>
  <button on:click={submit}>Submit</button>
</div>

<style>
  input {
    display: inline-block;
    flex: 1;
    margin-right: 10px;
  }
  .entry-text {
    box-shadow: none;
    padding-right: 10px;
    flex: 1;
    text-align: left;
  }
  .row {
    display: flex;
    margin: 4px 0;
    align-items: center;
  }
</style>