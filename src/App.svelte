<script>
	import ListEntry from './components/ListEntry.svelte';
	import PairListPresenter from './components/PairListPresenter.svelte';
	import PairListCrossPresenter from './components/PairListCrossPresenter.svelte';
	import Results from './components/Results.svelte';

	let options;
	let criteria;
	let scoredCriteria = [];
	let scoredOptions = [];
	let currentPage = 0;

	const next = () => currentPage += 1;

	// const previous = () => currentPage -= 1;

	const handleOptionsSubmit = ({ detail }) => {
		options = detail;
		next();
	}

	const handleCriteriaSubmit = ({ detail }) => {
		criteria = detail;
		next();
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

<main>
<h1>Volit</h1>
<p>A tool to make difficult decisions easier</p>
{#if currentPage === 0}
	<ListEntry 
		placeholder="Option text"
		on:submit={handleOptionsSubmit} 
		submitButtonText="Next"
		minLength={2}>
		<h3 slot="title">Step 1 of 4: Enter Options</h3>
		<p slot="description">Please enter the options you're deciding between. (Enter at least two.)</p>
	</ListEntry>
{:else if currentPage === 1}
	<ListEntry 
		placeholder="Criteria text"
		on:submit={handleCriteriaSubmit} 
		submitButtonText="Next">
		<h3 slot="title">Step 2 of 4: Enter Criteria</h3>
		<p slot="description">Please enter the criteria you wish to use to evaluate your options, such as "cost" or "time required"</p>
	</ListEntry>
{:else if currentPage === 2}
	<h3>Step 3 of 4: Rank Criteria</h3>
	<p>Which of these two criteria is more important?</p>
	<PairListPresenter
		items={criteria} 
		on:done={handleCriteriaScores}/>
{:else if currentPage === 3}
	<h3>Step 4 of 4: Rank Options by Criteria</h3>
	<PairListCrossPresenter 
		prompts={criteria}
		items={options} 
		on:done={handleOptionsScores}/>
{:else if currentPage === 4}
	<h3>Results</h3>
	<Results {scoredCriteria} {scoredOptions}/>
{:else}
	<h3>Oh No</h3>
	<p>Something went wrong. Please refresh the page.</p>
{/if}
</main>

<svelte:head>
	<title>Volit | Make Hard Decisions Easier</title>
</svelte:head>

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
