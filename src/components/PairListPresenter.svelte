<script>
  import pairsFromArray from '../utils/pairsFromArray';
  import PairPresenter from './PairPresenter.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let items = [];
  export let prompt;

  let scoredItems = items.map(e => ({ text: e, score: 0 }));

  let index = 0;

  let pairedItems = pairsFromArray(items);

  const submit = () => {
    let normalizedScores = scoredItems.map(e => ({ 
      ...e, 
      score: e.score/pairedItems.length
    }));
    dispatch('done', normalizedScores);
  }

  const handleScore = ({ detail }) => {
    scoredItems[detail].score += 1;
    scoredItems = [...scoredItems];
    if (index + 1 === pairedItems.length) submit();
    else index += 1;
  }
</script>

<PairPresenter 
  {prompt}
  pair={pairedItems[index]} 
  on:submit={handleScore}/>