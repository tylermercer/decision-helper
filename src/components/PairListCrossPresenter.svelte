<script>
  import { createEventDispatcher } from 'svelte';
  import PairListPresenter from './PairListPresenter.svelte';
  import Fade from './Fade.svelte';
  
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

<p>Which one of these <i>best</i> meets the following criteria?</p>
{#each [index] as index (index)} <!--Key hack; this forces this component to be redrawn when index changes-->
<Fade>
  <p>"{prompts[index]}"</p>
  <PairListPresenter
    {items}
    on:done={handleRowComplete}
    >
  </PairListPresenter>
</Fade>
{/each}