<script>
  import { Button } from 'svelte-chota';
  import { fade } from 'svelte/transition';

  export let scoredCriteria;

  export let scoredOptions;

  let showScores = false;

  const round = num => +(Math.round(num + "e+2")  + "e-2");

  const computeResults = (options, criteria) => {
		let res = options[0].map(({text}) => ({text, score: 0}));
		for (var c in criteria) {
			for (var o in options[0]) {
				res[o].score += options[c][o].score * (1 + criteria[c].score * 4);
			}
		}
		res.sort((a, b) => b.score - a.score);
    return res;
  }
  
  $: results = computeResults(scoredOptions, scoredCriteria);
</script>

<h3>Results</h3>
<div class="results">
  {#each results as { text, score }, i (i)}
    <p class="item" class:first={i === 0} class:primary-text={i === 0}>
      <span>{i + 1}. </span>
      {text}
      {#if showScores}
        <span class="text-grey" transition:fade={{duration: 200}}>
          {` (${round(score)})`}
        </span>
      {/if}
    </p>
  {/each}
</div>
<Button outline primary on:click={() => showScores = !showScores}>{showScores? "Hide" : "Show"} Scores</Button>
<p><a href="/">Reset</a></p>

<style>
  .first {
    font-size: 150%;
  }
  .item {
    margin-bottom: 4px;
  }
  .results {
    margin-bottom: 24px;
  }
</style>