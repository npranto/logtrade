import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
   
}

const styles = () => `
  .${componentId} {
    padding: 1em;
  }
`;

const Calendar = (props) => {
  const date = new Date();

  const getStocksByMonth = () => {
    return [
      { date: new Date('September 20, 2021'), stock: 20 },
      { date: new Date('September 21, 2021'), stock: 21 },
      { date: new Date('September 22, 2021'), stock: 22 }
    ]
  }

  return `
    <section class="Calendar ${componentId}">
      <h1 class="header mb-3 text-center">Calendar</h1>
      ${MonthlyCalendar({ 
        date,
        activeDate: date, 
        stocks: [],
        getStocksByMonth, 
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
);