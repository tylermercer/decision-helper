function getFadeInOut(duration, easingIn, easingOut) {
	
	const fadeIn = function(node) {
		const o = +getComputedStyle(node).opacity;
		return {
			delay:duration/2,
			duration:duration/2,
			css: t => `opacity: ${easingIn(t) * o}`
		};
	};
	
	const fadeOut = function(node) {
		const o = +getComputedStyle(node).opacity;
		return {
			duration:duration/2,
			css: t => `opacity: ${(easingOut||easingIn)(t) * o}`
		};
	};
	
	return [fadeIn, fadeOut];
}

export default getFadeInOut;