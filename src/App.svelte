<script>
	import ListEntry from './components/ListEntry.svelte';

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
{#if !options}
	<ListEntry 
		on:submit={handleOptionsSubmit} 
		submitButtonText="Next"
		minLength={2}>
		<h1 slot="title">Options</h1>
		<p slot="description">Please enter the options you're deciding between. (Enter at least two.)</p>
		<p slot="empty"><small>Enter a decision option to get started!</small></p>
	</ListEntry>
{:else if !criteria}
	<ListEntry 
		on:submit={handleCriteriaSubmit} 
		submitButtonText="Next">
		<h1 slot="title">Criteria</h1>
		<p slot="description">Please enter the criteria you wish to use to evaluate your options.</p>
		<p slot="empty"><small>No criteria yet!</small></p>
	</ListEntry>
{:else if !criteriaAreScored}
	<h1>WIP</h1>
	<h2>Criteria:</h2>
	<ul>
	{#each criteria as { text, id }, i (id)}
		<li>{text}</li>	
	{/each}
	</ul>
	<h2>Options:</h2>
	<ul>
	{#each options as { text, id }, i (id)}
		<li>{text}</li>
	{/each}
	</ul>
	<div>
		<button on:click={handleCriteriaScores}>Score criteria</button>
	</div>
{:else if !optionsAreScored}
	<h1>WIP</h1>
	<div>
		<button on:click={handleOptionsScores}>Score options</button>
	</div>
{:else}
	<h1>Results</h1>
{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 320px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: 480px;
		}
	}
</style>
