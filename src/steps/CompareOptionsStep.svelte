<script>
  import PairListCrossPresenter from '../components/PairListCrossPresenter.svelte';
  export let criteria;
  export let options;
</script>

<h3>Step 4 of 4: Rank Options by Criteria</h3>
<PairListCrossPresenter 
  prompts={criteria}
  items={options} 
  on:done/>