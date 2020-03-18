<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'svelte-chota';
  export let pair;
  export let prompt;

  const dispatch = createEventDispatcher();

  const onSelect = (i) => dispatch('submit', pair[i].index);
</script>

<p>{prompt}</p>
<div class="row">
{#each pair as { item, index }, i (i)}
  <div class="item">
    <p>{item}</p>
    <Button on:click={() => onSelect(i)}>Option {i+1}</Button>
  </div>
{/each}
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    max-width: 50%;
    justify-content: space-between;
  }
  .item p {
    text-align: center;
  }
</style>