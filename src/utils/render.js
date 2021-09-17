const render = (
  props = {}, 
  componentId,
  component, 
  styles = '',
  onLoad = () => {}, 
  parentElement = document.getElementById('root'), 
  state = {},
) => {
  if (!componentId || typeof componentId !== 'string') {
    throw new Error('Please provide a component ID to render');
  }
  if (!component) {
    throw new Error('Please pass in a component to render');
  }

  let currentState = state;

  // utility to set state with a new state
  const setState = (newState) => {
    console.log({ newState });
    const hasStateChanged = JSON.stringify(newState) !== JSON.stringify(currentState);
    // only update state and re-render if the state changed
    if (hasStateChanged) {
      console.log('about to re-render....');

      currentState = {...currentState, ...newState};
      return render(
        props, 
        componentId,
        component, 
        styles, 
        onLoad,
        null, 
        newState,
      )
    }
  };

  // const state = (initialState = {}, Component, props, parent, state) => {
  //   let currentState = initialState;
  //   return {
  //     getState: () => ({...currentState}),
  //     setState: (newState) => {
  //       const hasStateChanged = JSON.stringify(newState) === JSON.stringify(currentState);
  //       // only update state and re-render if the state changed
  //       if (hasStateChanged) {
  //         currentState = {...currentState, ...newState};
  //         render(
  //           props, 
  //           componentId,
  //           Component, 
  //           styles, 
  //           onLoad,
  //           parent, 
  //           state,
  //         )
  //       }
  //     }, 
  //   }
  // }

  // generate dynamic component markup with custom props
  const html = component(props, currentState);
  console.log({ html });
  // generate dynamic component styles with custom props
  const css = styles(props, currentState);

  // loads up component functionalities on component mount
  // ref: https://stackoverflow.com/a/64530834
  const callback = () => {
    const el = document.querySelector(`.${componentId}`);
    if (el) {
      observer.disconnect();
      onLoad(props, currentState, setState);
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
    return parentElement.innerHTML = html;
  }
  return html;
}

export default render;