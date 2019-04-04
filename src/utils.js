export const pluralizing = ({ count, one, two, five }) => {
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

export const addLeadingZeros = value => {
  const stringValue = String(value);
  if (stringValue.length < 2) {
    return `0${stringValue}`;
  }
  return stringValue;
};

export const calculateCountdown = endDate => {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  // clear countdown when date is reached
  if (diff <= 0) {
    return null;
  }

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  };

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;

  return timeLeft;
};
