export const getMonthFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }

  const MONTHS_FULL= [
    "January","February","March","April","May","June","July",
    "August","September","October","November","December"
  ];

  const monthIndex = date.getMonth();

  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error(
      'Invalid month detected, check to ensure valid date is passed'
    );
  }

  return MONTHS_FULL[monthIndex];
}

export const getDateFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  return date.getDate();
}

export const getYearFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  return date.getFullYear();
}

export const getDayFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  const DAYS = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];

  const dayIndex = date.getDay();

  if (dayIndex < 0 || dayIndex > 6) {
    throw new Error(
      'Invalid day detected, check to ensure valid date is passed'
    );
  }

  return DAYS[dayIndex];
}

export const getNumberOfDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};