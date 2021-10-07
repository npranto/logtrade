const saveUserOnLocalStorage = user => 
  localStorage.setItem('logtrade:::user', JSON.stringify(user));

export default saveUserOnLocalStorage;