<script>
	import ListEntry from './components/ListEntry.svelte';
	import PairListPresenter from './components/PairListPresenter.svelte';
	import PairListCrossPresenter from './components/PairListCrossPresenter.svelte';

	import ResultsStep from './steps/ResultsStep.svelte';
	import EnterOptionsStep from './steps/EnterOptionsStep.svelte';
	import EnterCriteriaStep from './steps/EnterCriteriaStep.svelte';
	import CompareCriteriaStep from './steps/CompareCriteriaStep.svelte';
	import CompareOptionsStep from './steps/CompareOptionsStep.svelte';

	let options;
	let criteria;
	let scoredCriteria = [];
	let scoredOptions = [];
	let currentPage = 0;

	const next = (n = 1) => currentPage += n;

	// const previous = () => currentPage -= 1;

	const handleOptionsSubmit = ({ detail }) => {
		options = detail;
		next();
	}

	const handleCriteriaSubmit = ({ detail }) => {
		criteria = detail;
		if (criteria.length === 1) {
			//No need to score criteria
			scoredCriteria = [{ item: criteria[0], score: 1 }];
			next(2);
		}
		else {
			next();
		}
	}

	const handleCriteriaScores = ({ detail }) => {
		scoredCriteria = detail;
		next();
	}
	
	const handleOptionsScores = ({ detail }) => {
		scoredOptions = detail;
		next();
	}

</script>

<svelte:head>
	<title>Volit | Make Hard Decisions Easier</title>
</svelte:head>

<main>
<h1>Volit</h1>
<p>A tool to make difficult decisions easier</p>
{#if currentPage === 0}
	<EnterOptionsStep on:submit={handleOptionsSubmit}/>
{:else if currentPage === 1}
	<EnterCriteriaStep on:submit={handleCriteriaSubmit}/>
{:else if currentPage === 2}
	<CompareCriteriaStep 
		{criteria} 
		on:done={handleCriteriaScores}/>
{:else if currentPage === 3}
	<CompareOptionsStep 
		{criteria}
		{options}
		on:done={handleOptionsScores}/>
{:else if currentPage === 4}
	<ResultsStep {scoredCriteria} {scoredOptions}/>
{:else}
	<h3>Oh No</h3>
	<p>Something went wrong. Please refresh the page.</p>
{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 480px;
		margin: 0 auto;
	}

	:global(h1), :global(h2), :global(h3) {
		color: var(--color-primary);
	}

	:global(:root) {
			--color-primary: #00419c;
			--color-lightGrey: #d2d6dd;
			--color-grey: #747681;
			--color-darkGrey: #3f4144;
			--color-error: #d43939;
			--color-success: #28bd14;
			--grid-maxWidth: 120rem;
			--grid-gutter: 2rem;
			--font-size: 1.6rem;
			--font-family: "Helvetica Neue", sans-serif;
	}
</style>
