import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { getStocksByMonthAndYear } from "../utils/stocks";
import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
   
}

const styles = () => `
  .${componentId} {
    padding: 1em;
  }
`;

const Calendar = (props, state) => {
  const { date } = props.getState();
  // const getStocksForMonth = (month, year) => {
  //   return getStocksByMonthAndYear(month, year) || [];
  // }

  const updateDate = (newDate) => {
    props.setState(() => {
      return {
        date: newDate,
      };
    })
    // render(
    //   props, 
    //   componentId, 
    //   Calendar, 
    //   styles, 
    //   onLoad,
    //   null,
    //   {...state, date: newDate },
    // )
  }

  return `
    <section class="Calendar ${componentId}">
      <h1 class="header mb-3 text-center">Calendar</h1>
      ${MonthlyCalendar({ 
        date,
        // activeDate: state.date, 
        // stocks: [],
        // getStocksForMonth, 
        updateDate,
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