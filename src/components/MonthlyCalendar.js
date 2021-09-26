import { getDateFromDate, getMonthFromDate, getNextMonthFromDate, getNumberOfDaysInMonth, getPrevMonthFromDate, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import renderList from "../utils/renderList";
import { findMatchingStock } from "../utils/stocks";
import Day from "./Day";
import MonthNavigator from "./MonthNavigator";

const componentId = getUniqueId();

const getStocksForCurrentMonth = (props) => {
  const { activeDate } = props;

  const month = getMonthFromDate(activeDate);  // i.e., "February"
  const year = getYearFromDate(activeDate);    // i.e., 2020

  props.getStocksByMonthAndYear(month, year);
}

const onLoad = (props = {}) => {
  getStocksForCurrentMonth(props);
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
    grid-auto-rows: minmax(125px, auto);
    grid-gap: 0.5em;
  }
`;

const MonthlyCalendar = (props = {}) => {
  const { 
    dateToday,
    activeDate,
    stocks,
    onUpdateActiveDate,
  } = props;

  const onClickOnPrevMonth = () => {
    console.log('click on prev month detected...');
    const firstOfPrevMonth = getPrevMonthFromDate(activeDate);
    onUpdateActiveDate(firstOfPrevMonth);
  }
  const onClickOnNextMonth = () => {
    console.log('click on next month detected...');
    const firstOfNextMonth = getNextMonthFromDate(activeDate);
    onUpdateActiveDate(firstOfNextMonth);
  }

  // console.log({ props });

  const month = getMonthFromDate(activeDate);  // i.e., "February"
  const date = getDateFromDate(activeDate);    // i.e., 21
  const year = getYearFromDate(activeDate);    // i.e., 2020

  const numberOfDaysInMonth = 
    getNumberOfDaysInMonth(activeDate.getMonth(), year); // i.e., 28, 30, 31
  const firstOfMonth = new Date(`${month} 1, ${year}`);
  const indexOfFirstDayInMonth = firstOfMonth.getDay(); // i.e., 0-6, Sun - Saturday

  // calculates total number of day blocks to show on calendar (includes 
  // both void days in the beginning of month and the total number of days 
  // in that month). Note: "void" days referring to the grey blocked days 
  // in this calendar - https://i.postimg.cc/SxqdHqgN/Screen-Shot-2021-09-25-at-11-28-17-PM.png, as an example
  const numberOfDaysInGrid = numberOfDaysInMonth + indexOfFirstDayInMonth;
  
  const daysInGrid = [...Array(numberOfDaysInGrid).keys()]
    // maps over each day, calculates void day and month, date and year info
    .map((_, index) => {
      const isVoidDay = index < indexOfFirstDayInMonth;
      return {
        isVoidDay,
        month: isVoidDay ? null : `${month}`,
        date: isVoidDay ? null : `${(index - indexOfFirstDayInMonth) + 1}`,
        year: isVoidDay ? null : `${year}`,
      }
    })
    // maps over each day and finds potential matching stocks from that day 
    .map((dayGrid) => {
    const { month, date, year } = dayGrid;
    const matchingStock = findMatchingStock(stocks, month, date, year);
    return { 
      ...dayGrid, 
      stock: matchingStock || null 
    };
  })

  // console.log({ daysInGrid });

  console.log({ 
    month,
    date,
    year,
    // numberOfDaysInMonth,
    // firstOfMonth,
    // indexOfFirstDayInMonth,
    // numberOfDaysInGrid,
    daysInGrid,
  });

  return `
    <section class="MonthlyCalendar ${componentId}">
      ${MonthNavigator({
        prevMonth: getMonthFromDate(getPrevMonthFromDate(activeDate)),
        nextMonth: getMonthFromDate(getNextMonthFromDate(activeDate)),
        onClickOnPrevMonth,
        onClickOnNextMonth
      })}
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
        ${renderList(daysInGrid, (dayGrid, key) => {
          const { month, date, year } = dayGrid || {};
          const currentDate = new Date(`${month} ${date}, ${year}`);
          return `
            ${Day({ 
              ...dayGrid, 
              key, 
              activeDate, 
              onClick: () => onUpdateActiveDate(currentDate),
            })}
          `;
        })}
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