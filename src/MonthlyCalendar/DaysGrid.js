import { findMatchingTradesByDate, getDateFromDate, getMonthFromDate, getNumberOfDaysInMonth, getUniqueId, getYearFromDate } from "../utils";
import Day from "./Day";

const DaysGrid = (props) => {
  const { 
    activeDate,  
    // activeDateDate,
    activeMonth,
    activeYear,
    activeTradeLogs,
    todayDate,
    onSelectDay,
  } = props;
  
  const numberOfDaysInMonth = getNumberOfDaysInMonth(
    activeDate.getMonth(), 
    activeYear
  ); // i.e., 28, 30, 31
  const firstOfMonth = new Date(`${activeMonth} 1, ${activeYear}`);
  const indexOfFirstDayInMonth = firstOfMonth.getDay(); // i.e., 0-6, Sun - Saturday 

  // calculates total number of day blocks to show on calendar (includes 
  // both void days in the beginning of month and the total number of days 
  // in that month). Note: "void" days referring to the grey blocked days 
  // in this calendar - https://i.postimg.cc/SxqdHqgN/Screen-Shot-2021-09-25-at-11-28-17-PM.png, as an example
  const numberOfDaysInGrid = numberOfDaysInMonth + indexOfFirstDayInMonth;

  // console.log({
  //   numberOfDaysInMonth,
  //   firstOfMonth,
  //   indexOfFirstDayInMonth,
  //   numberOfDaysInGrid,
  //   daysInGrid
  // });

  const daysInGrid = [...Array(numberOfDaysInGrid).keys()]
    // maps over each day, calculates void day and month, date, and year info
    .map((_, index) => {
      const isVoidDay = index < indexOfFirstDayInMonth;
      return {
        isVoidDay,
        month: isVoidDay ? null : `${activeMonth}`,
        date: isVoidDay ? null : `${(index - indexOfFirstDayInMonth) + 1}`,
        year: isVoidDay ? null : `${activeYear}`,
      }
    })
    // maps over each day and finds potential matching stocks from that day 
    .map((dayGrid) => {
      const { month, date, year } = dayGrid;
      const matchingTrades = findMatchingTradesByDate(
        activeTradeLogs, 
        month, 
        date, 
        year
      );
      return { 
        ...dayGrid, 
        trades: matchingTrades || [], 
      };
    });
  
  console.log({
    numberOfDaysInMonth,
    firstOfMonth,
    indexOfFirstDayInMonth,
    numberOfDaysInGrid,
    daysInGrid
  });

  // return null;

  return (
    <div className="DaysGrid month-grid" id="month-grid">
      {daysInGrid.map((daysInGrid) => {
        const { month, date, year, isVoidDay } = daysInGrid;
        const isActiveDay = (`${getDateFromDate(activeDate)}` === date) 
          && (`${getMonthFromDate(activeDate)}` === month) 
          && (`${getYearFromDate(activeDate)}` === year);
        const isTodayDate = (`${getDateFromDate(todayDate)}` === date) 
         && (`${getMonthFromDate(todayDate)}` === month) 
          && (`${getYearFromDate(todayDate)}` === year);
        return (
          <Day 
            key={isVoidDay ? `${getUniqueId()}` :`${month}-${date}-${year}`} 
            {...daysInGrid} 
            isActiveDay={isActiveDay}
            isTodayDate={isTodayDate}
            onSelectDay={onSelectDay}
          />
        )
      })}
    </div>
  );
}

export default DaysGrid;