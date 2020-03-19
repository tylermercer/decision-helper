<script>
  import pairsFromArray from '../utils/pairsFromArray';
  import PairPresenter from './PairPresenter.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let items = [];

  let scoredItems = items.map(e => ({ text: e, score: 0 }));

  let index = 0;

  let pairedItems = pairsFromArray(items);

  const done = () => {
    let normalizedScores = scoredItems.map(e => ({ 
      ...e, 
      score: e.score/(items.length - 1) //Score is the percentage of relevant pairs that this item won
    }));
    dispatch('done', normalizedScores);
  }

  const handleScore = ({ detail }) => {
    scoredItems[detail].score += 1;
    scoredItems = [...scoredItems];
    if (index + 1 === pairedItems.length) done();
    else index += 1;
  }
</script>

<PairPresenter
  pair={pairedItems[index]} 
  on:submit={handleScore}>
</PairPresenter>