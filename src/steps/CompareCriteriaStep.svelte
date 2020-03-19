<script>
  import PairListPresenter from '../components/PairListPresenter.svelte';
  export let criteria;
</script>

<h3>Step 3 of 4: Rank Criteria</h3>
<p>Which of these two criteria is more important?</p>
<PairListPresenter
  items={criteria} 
  on:done/>