<script>
  import ListEntry from '../components/ListEntry.svelte'
</script>

<ListEntry 
		placeholder="Option text"
		on:submit 
		submitButtonText="Next"
		minLength={2}>
		<h3 slot="title">Step 1 of 4: Enter Options</h3>
		<p slot="description">Please enter the options you're deciding between. (Enter at least two.)</p>
</ListEntry>