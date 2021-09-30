import { getMonthFromDate, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { fetchStocksByMonthAndYear } from "../utils/stocks";
import { fetchAllTradesByUserId } from "../vendors/firebase/firebase.firestore";
import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const filterTradesByMonthAndYear = (trades = [], month, year) => {
  return trades.filter(trade => trade.month === month && trade.year === year);
}

const getTradesByMonthAndYear = async (props) => {
  const { user, activeDate } = props;
  const { uid } = user || {};
  const activeMonth = getMonthFromDate(activeDate);  // i.e., "February"
  const activeYear = getYearFromDate(activeDate).toString();    // i.e., 2020

  const fetchedAllTrades = await fetchAllTradesByUserId(uid);
  const filteredTradesByMonthAndYear = filterTradesByMonthAndYear(
    fetchedAllTrades,
    activeMonth,
    activeYear,
  );
  console.log({ fetchedAllTrades, filteredTradesByMonthAndYear });
  props.setState(() => {
    return { tradeLogs: filteredTradesByMonthAndYear }; 
  });
}

const onLoad = (props = {}) => {
  getTradesByMonthAndYear(props);
}

const styles = () => `
  .${componentId} {
    padding: 1em;
  }
`;

const Calendar = (props = {}) => {
  const { dateToday, activeDate, tradeLogs, user } = props;

  console.log({ dateToday, activeDate, user, tradeLogs });

  const onUpdateActiveDate = (newDate) => {
    if (!newDate || !(newDate instanceof Date)) {
      throw new Error(
        'Invalid `newDate` is passed to update active day. Please pass in a valid `Date` object to alter active date.'
      );
    }
    props.setState(() => {
      return { activeDate: newDate };
    });
  }

  return `
    <section class="Calendar ${componentId}">
      <h1 class="header text-center">Calendar</h1>
      ${MonthlyCalendar({ 
        dateToday,
        activeDate, 
        tradeLogs,
        // getStocksByMonthAndYear, 
        onUpdateActiveDate,
      })}
    </section>
  `
};

export default (props) => render(
  props, 
  componentId, 
  Calendar, 
  styles, 
  onLoad,
  null,
);