export const getPluralized = ({ count, one, two, five }) => {
  let number = Math.abs(count);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number === 1) {
    return one;
  }
  if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
};

let lastId = 0;

export const newid = (prefix = 'id') => {
  lastId += 1;
  return `${prefix}${lastId}`;
};

export default getPluralized;
