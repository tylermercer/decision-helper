<script>
	import ListEntry from './components/ListEntry.svelte';
	import PairListPresenter from './components/PairListPresenter.svelte';
	import PairListListPresenter from './components/PairListListPresenter.svelte';

	let options;
	let criteria;
	let criteriaAreScored = false;
	let optionsAreScored = false;

	const handleOptionsSubmit = ({ detail }) => {
		options = detail;
	}

	const handleCriteriaSubmit = ({ detail }) => {
		criteria = detail;
	}

	const handleCriteriaScores = ({ detail }) => {
		criteriaAreScored = true;
	}
	
	const handleOptionsScores = ({ detail }) => {
		optionsAreScored = true;
	}
</script>

<main>
<h1>Volit</h1>
<p>A tool to make difficult decisions easier</p>
{#if !options}
	<ListEntry 
		on:submit={handleOptionsSubmit} 
		submitButtonText="Next"
		minLength={2}>
		<h2 slot="title">Options</h2>
		<p slot="description">Please enter the options you're deciding between. (Enter at least two.)</p>
		<p slot="empty"><small>Enter a decision option to get started!</small></p>
	</ListEntry>
{:else if !criteria}
	<ListEntry 
		on:submit={handleCriteriaSubmit} 
		submitButtonText="Next">
		<h2 slot="title">Criteria</h2>
		<p slot="description">Please enter the criteria you wish to use to evaluate your options.</p>
		<p slot="empty"><small>No criteria yet!</small></p>
	</ListEntry>
{:else if !criteriaAreScored}
	<h2>WIP</h2>
	<h3>Criteria:</h3>
	<ul>
	{#each criteria as { text, id }, i (id)}
		<li>{text}</li>	
	{/each}
	</ul>
	<h3>Options:</h3>
	<ul>
	{#each options as { text, id }, i (id)}
		<li>{text}</li>
	{/each}
	</ul>
	<PairListPresenter 
		items={criteria} 
		on:done={handleCriteriaScores}/>
{:else if !optionsAreScored}
	<h2>WIP</h2>
	<PairListListPresenter 
		prompts={criteria}
		items={options} 
		on:done={handleCriteriaScores}/>
	<div>
		<button on:click={handleOptionsScores}>Score options</button>
	</div>
{:else}
	<h2>Results</h2>
{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 480px;
		margin: 0 auto;
	}

	:global(:root) {
			--color-primary: #003681;
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
