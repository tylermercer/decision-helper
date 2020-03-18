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
</script>

<main>
{#if !options}
	<ListEntry key="options" on:submit={handleOptionsSubmit}></ListEntry>
{:else if !criteria}
	<ListEntry key="criteria" on:submit={handleCriteriaSubmit}></ListEntry>
{:else if !criteriaAreScored}
	<h1>Criteria:</h1>
	<ul>
	{#each criteria as { text, id }, i (id)}
		<li>{text}</li>	
	{/each}
	</ul>
	<h1>Options:</h1>
	<ul>
	{#each options as { text, id }, i (id)}
		<li>{text}</li>	
	{/each}
	</ul>
{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: 480px;
		}
	}
</style>
