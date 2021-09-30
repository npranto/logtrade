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
  .${componentId} .add-trade-action {
    cursor: pointer;
    position: fixed;
    bottom: 0;
    right: 0;
    background: green;
    color: white;
    padding-top: 2em;
    padding-bottom: 1.5em;
    padding-left: 1.5em;
    padding-right: 1em;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 55px;
    background-color: black;
    color: whitesmoke;
    transition: box-shadow font-size 0.4s ease;
  }
  .${componentId} .add-trade-action:hover, 
  .${componentId} .add-trade-action:focus {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .${componentId} .add-trade-action svg, 
  .${componentId} .add-trade-action svg {
    transition: font-size 0.2s ease;
  }
  .${componentId} .add-trade-action:hover svg, 
  .${componentId} .add-trade-action:focus svg {
    font-size: 1.75rem;
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
      <div class="add-trade-action">
        <i class="fas fa-plus fa-lg"></i>
      </div>
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