export const saveItemLocalStorage = (key, value) => 
  localStorage.setItem(`${key}`, `${value}`);

export const getItemFromLocalStorage = (key) => 
  localStorage.getItem(`${key}`);

export const removeItemFromLocalStorage = (key) => 
  localStorage.removeItem(`${key}`);
