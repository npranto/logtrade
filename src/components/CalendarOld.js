import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";

const componentId = getUniqueId();


const getMonthFromDate = (date) => {
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

const getDateFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  return date.getDate();
}

const getYearFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  return date.getFullYear();
}

const getDayFromDate = (date) => {
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

const getNumberOfDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const drawNumberOfDaysInGrid = (numbersOfGridDays) => {
  // elements
  const monthGrid = document
    .querySelector(`.${componentId} #month-grid`);

  const listOfGridDays = [];
  for(let i = 0; i < numbersOfGridDays; i++) {
    listOfGridDays.push(`
      <div class="day" id="${i}"></div>
    `);
  }

  monthGrid.innerHTML = listOfGridDays.join('\n');
}

const markDateOnGrid = (indexOfFirstDayInMonth, numberOfDaysInGrid) => {
  // elements
  const allGridDays = [
    ...document.querySelectorAll(`.${componentId} #month-grid .day`)
  ];
  // console.log({ allGridDays });

  const gridsWithDates = allGridDays.filter((gridDay) => {
    return (
      (parseInt(gridDay.id) >= parseInt(indexOfFirstDayInMonth)) && 
      (parseInt(gridDay.id) <= parseInt(numberOfDaysInGrid))
    );
  })
  // console.log({ gridsWithDates });
  gridsWithDates.forEach((gridDay, index) => gridDay.innerHTML = `
    <p class="date" id="date-${index + 1}">${index + 1}</p>
  `)
}

const markUnusedDateOnGrid = () => {
  // elements
  const allGridDays = [
    ...document.querySelectorAll(`.${componentId} #month-grid .day`)
  ];
  console.log({ allGridDays });

  const gridsWithoutDates = allGridDays.filter((gridDay) => {
    return gridDay.innerHTML.trim().length === 0;
  })

  gridsWithoutDates.forEach((gridDay) => gridDay.innerHTML = `
    <div class="void"></div>
  `)
}

const onLoad = (props = {}) => {
  const { currentDate = new Date() } = props;
  const month = getMonthFromDate(currentDate);
  const date = getDateFromDate(currentDate);
  const year = getYearFromDate(currentDate);
  const numberOfDaysInMonth = 
    getNumberOfDaysInMonth(currentDate.getMonth(), year);
  const firstOfMonth = new Date(`${month} 1, ${year}`);
  const indexOfFirstDayInMonth = firstOfMonth.getDay();
  const numberOfDaysInGrid = numberOfDaysInMonth + indexOfFirstDayInMonth;

  console.log({ 
    month, date, year, numberOfDaysInMonth, firstOfMonth, indexOfFirstDayInMonth, numberOfDaysInGrid
  });


  drawNumberOfDaysInGrid(numberOfDaysInGrid);
  markDateOnGrid(indexOfFirstDayInMonth, numberOfDaysInGrid);
  markUnusedDateOnGrid(); 
}

const styles = () => `
  .${componentId} {
    padding: 1em;
  }
  .${componentId} .date-and-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .${componentId} .bold {
    font-weight: bold;
    font-size: 2rem;
  }
  .${componentId} .stats {
    display: flex;
    align-items: center;
  }
  .${componentId} .stats > * {
    padding: 0 0.5em;
  }
  .${componentId} .day-labels {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0.5em;
  }
  .${componentId} .day-labels .day {
    text-align: center;
    font-size: 0.75rem;
    margin-bottom: 0.5em;
  }
  .${componentId} .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 100px;
    grid-gap: 0.5em;
  }
  .${componentId} .month-grid .day {
    border: 1px solid lightgrey; 
  }
  .${componentId} .month-grid .day .date {
    width: 25px;
    height: 25px;
    border-bottom-right-radius: 5px;
    background: maroon; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.75rem;
  }
  .${componentId} .month-grid .day .void {
    width: 100%;
    height: 100%;
    background: lightgrey;
    cursor: not-allowed;
  }
`;

const Calendar = (props) => {
  return `
    <section class="Calendar ${componentId}">
      <h1 class="header mb-3 text-center">Calendar</h1>
      <div class="date-and-stats">
        <h3 class="date text-center text-muted">September 21, 2021</h1>
        <div class="stats text-muted">
          <p>Wins: <span class="text-success bold">7</span></p>
          <p>Losses: <span class="text-danger bold">10</span></p>
          <p>Days Left: <span class="bold">13</span></p>
        </div>
      </div>
      <div class="day-labels">
        <p class="day">Sunday</p>
        <p class="day">Monday</p>
        <p class="day">Tuesday</p>
        <p class="day">Wednesday</p>
        <p class="day">Thursday</p>
        <p class="day">Friday</p>
        <p class="day">Saturday</p>
      </div>
      <div class="month-grid" id="month-grid"></div>
    </section>
  `
};

export default (props) => render(
  props, 
  componentId, 
  Calendar, 
  styles, 
  onLoad,
);