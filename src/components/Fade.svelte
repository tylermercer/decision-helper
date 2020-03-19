<script>
  import {quadIn, quadOut} from 'svelte/easing';
  export let duration = 250;
  export let easeIn = quadIn;
  export let easeOut = quadOut;
  
  const fadeIn = function(node) {
    const o = +getComputedStyle(node).opacity;
    node.hidden = true;
    setTimeout(() => node.hidden = false, duration/2);
    return {
      delay: duration/2,
      duration:duration,
      css: t => `opacity: ${easeIn(t) * o};`
    };
  };

  const fadeOut = function(node) {
  const o = +getComputedStyle(node).opacity;
    return {
      duration:duration/2,
      css: t => `opacity: ${easeOut(t) *o}`
    };
  };
</script>

<div in:fadeIn|local out:fadeOut|local>
  <slot></slot>
</div>