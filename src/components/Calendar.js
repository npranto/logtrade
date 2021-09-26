import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { fetchStocksByMonthAndYear } from "../utils/stocks";
import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
   
}

const styles = () => `
  .${componentId} {
    padding: 1em;
  }
`;

const Calendar = (props = {}) => {
  console.log({ props });
  const { dateToday, activeDate, stocks } = props;

  const getStocksByMonthAndYear = (month, year) => {
    const fetchedStocks = fetchStocksByMonthAndYear(month, year) || [];
    props.setState(() => {
      return { stocks: fetchedStocks }; 
    });
  }

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
      <h1 class="header mb-3 text-center">Calendar</h1>
      ${MonthlyCalendar({ 
        dateToday,
        activeDate, 
        stocks,
        getStocksByMonthAndYear, 
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