<script>
  import pairsFromArray from '../utils/pairsFromArray';
  import PairPresenter from './PairPresenter.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let items = [];

  let scoredItems;

  let index;

  let pairedItems = pairsFromArray(items);

  const init = () => {
    scoredItems = items.map(e => ({ text: e, score: 0 }));
    index = 0;
  }

  const done = () => {
    let normalizedScores = scoredItems.map(e => ({ 
      ...e, 
      score: e.score/(items.length - 1) //Score is the percentage of relevant pairs that this item won
    }));
    dispatch('done', normalizedScores);
    init();
  }

  const handleScore = ({ detail }) => {
    scoredItems[detail].score += 1;
    scoredItems = [...scoredItems];
    if (index + 1 === pairedItems.length) done();
    else index += 1;
  }

  init();
</script>

<PairPresenter
  pair={pairedItems[index]} 
  on:submit={handleScore}>
</PairPresenter>