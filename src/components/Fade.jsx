import React, { useState, useEffect, useRef } from 'react';

const Fade = ({ children, duration = 400, durationIn = duration / 2, durationOut = duration / 2 }) => {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    // Delay showing the component to allow for fade-in effect
    const fadeInTimeout = setTimeout(() => {
      setShow(true);
    }, durationOut); // This matches the Svelte logic of delaying visibility

    return () => {
      clearTimeout(fadeInTimeout);
      // Component is unmounting, trigger fade-out
      // This part is tricky because React unmounts immediately.
      // For a true fade-out on unmount, more complex solutions like
      // react-transition-group would be needed.
      // Here, we'll just manage the opacity for fade-in.
    };
  }, [durationOut]);

  const style = {
    transition: `opacity ${show && isMounted ? durationIn : durationOut}ms ease-${show && isMounted ? 'in' : 'out'}`,
    opacity: show && isMounted ? 1 : 0,
  };

  // The Svelte version has a delay before making the element visible.
  // We can achieve a similar effect by initially rendering null or applying a hidden style.
  // However, for simplicity and to leverage CSS transitions, we'll control opacity.
  // The `node.hidden = true; setTimeout(() => node.hidden = false, durationOut);`
  // is approximated by the initial opacity of 0 and the transition.

  return (
    <div ref={nodeRef} style={style}>
      {children}
    </div>
  );
};

export default Fade;
