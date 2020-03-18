<script>
  import pairsFromArray from '../utils/pairsFromArray';
  import PairPresenter from './PairPresenter.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let items = [];

  let scoredItems;

  let index = 0;

  let pairedItems = pairsFromArray(items);

  const initScoredItems = () => {
    scoredItems = items.map(e => ({ text: e, score: 0 }));
  }

  const done = () => {
    let normalizedScores = scoredItems.map(e => ({ 
      ...e, 
      score: e.score/pairedItems.length
    }));
    dispatch('done', normalizedScores);
    initScoredItems();
  }

  const handleScore = ({ detail }) => {
    scoredItems[detail].score += 1;
    scoredItems = [...scoredItems];
    if (index + 1 === pairedItems.length) done();
    else index += 1;
  }

  initScoredItems();
</script>

<PairPresenter
  pair={pairedItems[index]} 
  on:submit={handleScore}>
</PairPresenter>