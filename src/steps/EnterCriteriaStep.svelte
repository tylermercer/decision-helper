<script>
  import ListEntry from '../components/ListEntry.svelte'
</script>

<ListEntry 
  placeholder="Criteria text"
  on:submit 
  submitButtonText="Next">
  <h3 slot="title">Step 2 of 4: Enter Criteria</h3>
  <p slot="description">Please enter the criteria you wish to use to evaluate your options, such as "cost" or "time required"</p>
</ListEntry>