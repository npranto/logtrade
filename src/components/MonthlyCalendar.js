import { getDateFromDate, getMonthFromDate, getNumberOfDaysInMonth, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { findMatchingStock } from "../utils/stocks";
import Day from "./Day";

const componentId = getUniqueId();

const loadStocksByMonth = (props) => {
  props.getStocksForMonth();

  // if (JSON.stringify(stocks) !== JSON.stringify(props.stocks)) {
  //   console.log('stocks diff detected... re-rendering');
  //   render(
  //     {...props, stocks }, 
  //     componentId, 
  //     MonthlyCalendar, 
  //     styles, 
  //     onLoad,
  //   )
  // }
}

const onUpdateDate = (props) => {
  setTimeout(() => {
    console.log('updating date now...');
    const newDate = new Date(`October 1, 2021`);
    props.updateDate(newDate);
  }, 5000);
  

  // if (JSON.stringify(newDate) !== JSON.stringify(props.date)) {
  //   console.log('updating date...');
  //   const result = render(
  //     {...props, date: newDate }, 
  //     componentId, 
  //     MonthlyCalendar, 
  //     styles, 
  //     onLoad,
  //   )
  //   console.log({ result: JSON.stringify(result, null, 2) });
  // } else {
  //   console.log('no new changes... not updating date...');
  // }
}

const onLoad = (props = {}) => {
  // loadStocksByMonth(props);
  onUpdateDate(props);
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
    stocks,
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
  
  const daysGrid = [...Array(numberOfDaysInGrid).keys()]
    .map((_, index) => {
      const isVoidDay = index < indexOfFirstDayInMonth;
      return {
        isVoidDay,
        month: isVoidDay ? null : `${month}`,
        date: isVoidDay ? null : `${(index - indexOfFirstDayInMonth) + 1}`,
        year: isVoidDay ? null : `${year}`,
      }
    });
  console.log({ daysGrid });

  const daysGridWithStocks = daysGrid.map((dayGrid) => {
    const { month, date, year } = dayGrid;
    const matchingStock = findMatchingStock(stocks, month, date, year);
    return { 
      ...dayGrid, 
      stock: matchingStock || null 
    };
  })
  console.log({ daysGridWithStocks });

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

  const renderList = (list, cb) => {
    let randomId = getUniqueId();
    const newList = [];

    for(let i = 0; i<list.length; i++) {
      newList.push(cb(list[i], randomId));
      randomId = getUniqueId();
    }

    console.log({ newList });

    return newList.join('\n');
  };

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
        ${renderList(daysGridWithStocks, (dayGrid, key) => {
          return `${Day({ ...dayGrid, key })}`;
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