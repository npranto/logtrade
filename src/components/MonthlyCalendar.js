import { getDateFromDate, getMonthFromDate, getNumberOfDaysInMonth, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import Day from "./Day";

const componentId = getUniqueId();

const loadStocksByMonth = (props) => {
  const {     
    getStocksByMonth, 
  } = props;

  const stocks = getStocksByMonth();
  console.log({ stocks });

  if (JSON.stringify(stocks) !== JSON.stringify(props.stocks)) {
    console.log('stocks diff detected... re-rendering');
    render(
      {...props, stocks }, 
      componentId, 
      MonthlyCalendar, 
      styles, 
      onLoad,
    )
  }
}

const onLoad = (props = {}) => {
  loadStocksByMonth(props);
}

const styles = () => `
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
`;

const MonthlyCalendar = (props = {}) => {
  const { 
    date: currentDate,
    activeDate,
    stocks = [],
  } = props;

  console.log({ props });

  const month = getMonthFromDate(currentDate);  // i.e., "February"
  const date = getDateFromDate(currentDate);    // i.e., 21
  const year = getYearFromDate(currentDate);    // i.e., 2020

  const numberOfDaysInMonth = 
    getNumberOfDaysInMonth(currentDate.getMonth(), year); // i.e., 28, 30, 31
  const firstOfMonth = new Date(`${month} 1, ${year}`);
  const indexOfFirstDayInMonth = firstOfMonth.getDay(); // i.e., 0-6, Sun - Saturday

  const numberOfDaysInGrid = numberOfDaysInMonth + indexOfFirstDayInMonth;
  const daysGrid = [...Array(numberOfDaysInGrid).keys()].map((day, index) => {
    const isVoidDay = index < indexOfFirstDayInMonth;
    return {
      isVoidDay,
      date: isVoidDay 
        ? null 
        : new Date(`${month} ${(index - indexOfFirstDayInMonth) + 1}, ${year}`),
    }
  });

  console.log({ 
    month,
    date,
    year,
    numberOfDaysInMonth,
    firstOfMonth,
    indexOfFirstDayInMonth,
    numberOfDaysInGrid,
    daysGrid,
  });

  return `
    <section class="MonthlyCalendar ${componentId}">
      <div class="date-and-stats">
        <h3 class="date text-center text-muted">${month} ${date}, ${year}</h1>
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
      <div class="month-grid" id="month-grid">
        ${daysGrid.map((day) => {
          const { isVoidDay, date } = day || {};
          return `
            ${Day({ isVoidDay, date })}
          `;
        }).join('\n')}
      </div>
    </section>
  `
};

export default (props) => render(
  props, 
  componentId, 
  MonthlyCalendar, 
  styles, 
  onLoad,
);