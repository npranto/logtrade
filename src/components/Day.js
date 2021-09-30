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

const getTotalProfitFromTrades = (trades = []) => {
  if (trades === null || !trades.length) return '0.00';
  return trades
    // extract each trade properties to calculate total profit
    .map(trade => ({ 
      tradeType: trade.tradeType, 
      openingPrice: parseFloat(trade.openingPrice).toFixed(2),
      closingPrice: parseFloat(trade.closingPrice).toFixed(2),
      numberOfShares: parseInt(trade.numberOfShares),
    }))
    // calculate each trade profit by trade type
    .map((trade) => {
      // on short trade, opening price > closing price
      if (trade.tradeType === 'short') {
        return trade.openingPrice - trade.closingPrice;
      }
      // on long trade, closing price > opening price
      return trade.closingPrice - trade.openingPrice;
    }) 
    // adds up all the trade profits together
    .reduce((totalProfit, eachTradeProfit) => {
      return totalProfit + eachTradeProfit;
    }, 0)
    .toFixed(2);
}

const getTickersFromTrades = (trades = []) => {
  if (trades === null || !trades.length) return '';
  return trades
    .map(trade => trade.ticker)
    .join(', ');
}

const Day = (props = {}) => {
  const { isVoidDay, month, date, year, trades } = props;
  // console.log({ dayProps: props });

  const totalProfit = getTotalProfitFromTrades(trades);
  const tickers = getTickersFromTrades(trades);
  const numberOfTrades = trades?.length || 0;

  const isTotalProfitNegative = totalProfit < 0;

  console.log({ date, totalProfit, tickers, numberOfTrades });

  if (isVoidDay) {
    return `
      <div class="Day ${props.key || componentId} ${isVoidDay ? 'void' : ''}"></div>
    `
  }
  return `
    <div class="Day p-1 ${props.key || componentId} ${!isVoidDay ? 'date' : ''} ${numberOfTrades < 0 ? 'bg-light text-black' : ''} ${numberOfTrades && isTotalProfitNegative ? 'bg-danger text-white' : ''} ${numberOfTrades && !isTotalProfitNegative ? 'bg-success text-white' : ''}" id="${month}-${date}-${year}">
      <span class="date-label">${date}</span>
      ${numberOfTrades > 0 ? `
        <div class="daily-stat p-2">
        ${!!totalProfit ? `
          <p class="profit mt-1 mb-1 border-bottom border-light">
            <span class="label">Profit</span>
            <span class="value">${totalProfit}</span>
          </p>
        ` : ''}

        ${!!numberOfTrades ? `
          <p class="number-of-trades mt-1 mb-1 border-bottom border-light">
            <span class="label"># Trades</span>
            <span class="value">${numberOfTrades}</span>
          </p>
        ` : ''}

        ${!!tickers ? `
          <p class="tickers mt-1 mb-1">
            <span class="value">${tickers}</span>
          </p>
        ` : ''}
      </div>
      ` : ''
      }
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