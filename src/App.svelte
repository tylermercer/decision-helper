
<script>
	import ListEntry from './components/ListEntry.svelte';

	const handleSubmit = ({ detail }) => {
		console.log(detail);
	}
</script>

<main>
	<ListEntry on:submit={handleSubmit}></ListEntry>
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
