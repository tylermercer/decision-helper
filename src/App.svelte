<script>
	import ResultsStep from './steps/ResultsStep.svelte';
	import EnterOptionsStep from './steps/EnterOptionsStep.svelte';
	import EnterCriteriaStep from './steps/EnterCriteriaStep.svelte';
	import CompareCriteriaStep from './steps/CompareCriteriaStep.svelte';
	import CompareOptionsStep from './steps/CompareOptionsStep.svelte';
	
	import Fade from './components/Fade.svelte';

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

<main>
	<h1>
		<a class="logo" href="/">Volit</a>
	</h1>
	<p>A tool to make difficult decisions easier</p>
	{#if currentPage === 0}
		<Fade>
			<EnterOptionsStep on:submit={handleOptionsSubmit}/>
		</Fade>
	{:else if currentPage === 1}
		<Fade>
			<EnterCriteriaStep on:submit={handleCriteriaSubmit}/>
		</Fade>
	{:else if currentPage === 2}
		<Fade>
			<CompareCriteriaStep 
				{criteria} 
				on:done={handleCriteriaScores}/>
		</Fade>
	{:else if currentPage === 3}
		<Fade>
			<CompareOptionsStep 
				{criteria}
				{options}
				on:done={handleOptionsScores}/>
		</Fade>
	{:else if currentPage === 4}
		<Fade>
			<ResultsStep {scoredCriteria} {scoredOptions}/>
		</Fade>
	{:else}
		<Fade>
			<h3>Oh No</h3>
			<p>Something went wrong. Please refresh the page.</p>
		</Fade>
	{/if}
</main>