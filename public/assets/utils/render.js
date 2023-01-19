/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable default-param-last */
const render = (
	props = {},
	componentId,
	component,
	styles = '',
	onLoad = () => {},
	parentElement
) => {
	if (!componentId || typeof componentId !== 'string') {
		throw new Error('Please provide a component ID to render');
	}
	if (!component) {
		throw new Error('Please pass in a component to render');
	}

	// generate dynamic component markup with custom props
	const html = component(props);
	// generate dynamic component styles with custom props
	const css = styles(props);

	// loads up component functionalities on component mount
	// ref: https://stackoverflow.com/a/64530834
	const callback = () => {
		const el = document.querySelector(`.${componentId}`);
		if (el) {
			observer.disconnect();
			onLoad(props);
		}
	};
	const observer = new MutationObserver(callback);
	observer.observe(document.body, { subtree: true, childList: true });

	// loads up component CSS on component mount
	if (css) {
		const styleElement = document.createElement('style');
		if (styleElement.styleSheet) styleElement.styleSheet.cssText = css;
		else styleElement.appendChild(document.createTextNode(css));
		document.head.appendChild(styleElement);
	}

	// spits out component markup to render
	if (parentElement) {
		return (parentElement.innerHTML = html);
	}
	return html;
};

export default render;
