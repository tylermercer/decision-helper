<script>
	import ListEntry from './components/ListEntry.svelte';
	import PairListPresenter from './components/PairListPresenter.svelte';
	import PairListCrossPresenter from './components/PairListCrossPresenter.svelte';

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
		placeholder="Option text"
		on:submit={handleOptionsSubmit} 
		submitButtonText="Next"
		minLength={2}>
		<h3 slot="title">Options</h3>
		<p slot="description">Please enter the options you're deciding between. (Enter at least two.)</p>
		<p slot="empty" class="text-grey">Enter a decision option to get started!</p>
	</ListEntry>
{:else if !criteria}
	<ListEntry 
		placeholder="Criteria text"
		on:submit={handleCriteriaSubmit} 
		submitButtonText="Next">
		<h2 slot="title">Criteria</h2>
		<p slot="description">Please enter the criteria you wish to use to evaluate your options.</p>
		<p slot="empty" class="text-grey">No criteria yet!</p>
	</ListEntry>
{:else if !criteriaAreScored}
	<h3>WIP</h3>
	<h4>Criteria:</h4>
	<ul>
	{#each criteria as { text, id }, i (id)}
		<li>{text}</li>	
	{/each}
	</ul>
	<h4>Options:</h4>
	<ul>
	{#each options as { text, id }, i (id)}
		<li>{text}</li>
	{/each}
	</ul>
	<PairListPresenter 
		items={criteria} 
		on:done={handleCriteriaScores}/>
{:else if !optionsAreScored}
	<h3>WIP</h3>
	<PairListCrossPresenter 
		prompts={criteria}
		items={options} 
		on:done={handleCriteriaScores}/>
	<div>
		<button on:click={handleOptionsScores}>Score options</button>
	</div>
{:else}
	<h3>Results</h3>
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
