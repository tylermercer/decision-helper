<script>
  export let duration = 400;
  export let easeIn = t => t;
  export let easeOut = t => t;

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