const getUserFromLocalStorage = () => {
  const userStringified = localStorage.getItem('logtrade:::user');
  if (userStringified === null) return null;
  return JSON.parse(userStringified);
}

export default getUserFromLocalStorage;
