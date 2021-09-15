const renderHTML = (html, element) => {
  if (!element) 
    throw new Error('Unable to find element in DOM to render HTML');
  element.innerHTML = html;
}

export default renderHTML;