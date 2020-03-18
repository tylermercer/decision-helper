<script>
  import PairListPresenter from './PairListPresenter.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let items = [];

  export let prompts = [];

  let index = 0;
  let scores = [];

  const done = () => dispatch('done', scores);

  const handleRowComplete = ({ detail }) => {
    let rowScores = detail;
    scores = [...scores, rowScores];
    if (index + 1 === prompts.length) done()
    else index += 1;
  }
</script>

<PairListPresenter
  prompt={prompts[index]}
  {items}
  on:done={handleRowComplete}
  />