<script>
  import createId from '../uid.js';
  import { createEventDispatcher } from 'svelte';
  import { Field, Button, Input } from 'svelte-chota';

  export let submitButtonText = "Submit";

  export let minLength = 1;

  export let placeholder = "Your text here...";

	const dispatch = createEventDispatcher();

  let entries = [];

  let entry = "";

  const addEntry = () => {
    if (!entry) return;
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

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;
    addEntry();
  }

</script>

<div>
  <slot name="title"></slot>
  <slot name="description"></slot>
  {#each entries as { text, id }, i (id)}
    <div key={id} class="row">
      <span class="entry-text">{text}</span>
      <button class="button outline" on:click={() => deleteItem(id)}>Delete</button>
    </div>
  {:else}
    <slot name="empty"></slot>
  {/each}
  <Field gapless grouped>
    <!-- svelte-ignore a11y-autofocus -->
    <Input 
      {placeholder} 
      on:keydown="{handleEnter}" 
      bind:value={entry} 
      autofocus/>
    <Button 
      primary 
      on:click={addEntry} 
      disabled={!entry}>Add</Button>
  </Field>
  <Button
    class="pull-right"
    primary
    disabled={entries.length < minLength} 
    on:click={submit}>
    {submitButtonText}
  </Button>
</div>

<style>
  .entry-text {
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