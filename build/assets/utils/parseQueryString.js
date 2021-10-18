const parseQueryString = (queryString = window.location.search) => {
  if (!queryString) return {};
  return queryString
    .split('?')[1]
    .split('&')
    .reduce((queryObj, eachQuery) => {
      const [key, value] = eachQuery.split('=');
      if (!key || !value) return queryObj;
      return {...queryObj, [key]: value};
    }, {});
}

export default parseQueryString;