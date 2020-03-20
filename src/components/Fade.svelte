<script>
  export let duration = 400;
  export let durationIn = duration/2;
  export let durationOut = duration/2;
  export let easeIn = t => t;
  export let easeOut = t => t;

  const fadeIn = function(node) {
    const o = +getComputedStyle(node).opacity;
    //Give time for previous element to fade out
    node.hidden = true;
    setTimeout(() => node.hidden = false, durationOut);
    return {
      duration: durationIn + durationOut,
      easing: easeIn,
      /* 
      t is multiplied by duration/durationIn below because the time in which the animation can complete 
      is reduced (because of the setTimeout above), so we need to speed up to finish in time
      */
      css: t => `opacity: ${t * 2 * o}`
    };
  };

  const fadeOut = function(node) {
  const o = +getComputedStyle(node).opacity;
    return {
      duration: durationOut,
      easing: easeOut,
      css: t => `opacity: ${t * o}`
    };
  };
</script>

<div in:fadeIn|local out:fadeOut|local>
  <slot></slot>
</div>