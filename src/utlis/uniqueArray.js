  // функция для удаления повторении при одинаковом id
const uniqueArray = (array) =>Object.values(array.reduce((acc, cur) => {
  acc[cur.id] = acc[cur.id] || cur;
  return acc;
}, {}));

export default uniqueArray