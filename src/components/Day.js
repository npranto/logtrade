import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
// import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const listenForClickOnDay = (props) => {
  const { month, date, year, onClick } = props;

  const dayBlock = document.querySelector(`#${month}-${date}-${year}`);
  // console.log({ dayBlock });

  if (dayBlock) {
    // console.log('setting up day block click event...');
    dayBlock.addEventListener('click', onClick);
  }
}

const onLoad = (props = {}) => {
  listenForClickOnDay(props);
}

const styles = (props) => {
  const componentId = `${props.key || componentId}`;
  return `
    .${componentId} {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      border: none;
      border-radius: 5%;
      outline: none;
      background: none; 
    }
    .${componentId}.date {
      cursor: pointer;
      border-bottom-right-radius: 5px;
      font-size: 0.75rem;
      transition: box-shadow 0.4s ease-in-out;
      color: white;
      padding: 0.5em;
    }
    .${componentId}.date:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    .${componentId}.void {
      width: 100%;
      height: 100%;
      visibility: hidden;
    }
    .${componentId} .daily-stat > p {
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  `
};

const Day = (props = {}) => {
  const { isVoidDay, month, date, year, stock } = props;
  const currentStock = {
    totalProfit: '71.93',
    numberOfTrades: '2',
    tickers: 'IIPR, ALB, MATIC'
  };
  console.log({ month, date, year, currentStock });

  const isProfitNegative = parseInt(currentStock?.totalProfit) < 0;

  if (isVoidDay) {
    return `
      <div class="Day ${props.key || componentId} ${isVoidDay ? 'void' : ''}"></div>
    `
  }
  return `
    <div class="Day p-1 ${props.key || componentId} ${!isVoidDay ? 'date' : ''} ${isProfitNegative ? 'bg-danger' : 'bg-success'}" id="${month}-${date}-${year}">
      <span class="date-label">${date}</span>
      <div class="daily-stat p-2">
        <p class="profit mt-1 mb-1 border-bottom border-light">
          <span class="label">Profit</span>
          <span class="value">${currentStock.totalProfit}</span>
        </p>
        <p class="number-of-trades mt-1 mb-1 border-bottom border-light">
          <span class="label"># Trades</span>
          <span class="value">${currentStock.numberOfTrades}</span>
        </p>
        <p class="tickers mt-1 mb-1">
          <span class="value">${currentStock.tickers}</span>
        </p>
      </div>
    </div>
  `
};

export default (props) => render(
  props, 
  props.key || componentId, 
  Day, 
  styles, 
  onLoad,
);