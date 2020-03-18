<script>
  import PairPresenter from './PairPresenter.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let items = [];

  let scoredItems = items.map(e => ({ ...e, score: 0 }));

  const submit = () => {
    let normalizedScores = scoredItems.map(e => ({ 
      ...e, 
      score: e.score/scoredItems.length
    }));
    dispatch('done', normalizedScores);
  }

  console.log(scoredItems);
</script>

<div>
  <p>Pair List Presenter</p>
  <PairPresenter></PairPresenter>
  <button on:click={submit}>Submit</button>
</div>