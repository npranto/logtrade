import getUniqueId from "./getUniqueId";

const renderList = (list, cb) => {
  let randomId = getUniqueId();
  const newList = [];

  for(let i = 0; i < list.length; i++) {
    newList.push(cb(list[i], randomId));
    randomId = getUniqueId();
  }

  console.log({ newList });

  return newList.join('\n');
};

export default renderList;
