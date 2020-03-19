<script>
  import getFadeInOut from '../utils/fadeInOut.js';
  import {quadIn, quadOut} from 'svelte/easing';
  export let duration = 250;
  const [fadeIn, fadeOut] = getFadeInOut(duration, quadIn, quadOut);
</script>

<div in:fadeIn|local out:fadeOut|local>
	<slot></slot>
</div>