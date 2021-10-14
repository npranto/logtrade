import { getTickersFromTrades, getTotalProfitFromTrades } from "../utils";

const Day = props => {
  // console.log({ props });
  const { 
    isVoidDay, month, date, year, trades, isActiveDay, onSelectDay
  } = props;

  const totalProfit = getTotalProfitFromTrades(trades);
  const tickers = getTickersFromTrades(trades);
  const numberOfTrades = (trades || []).length;

  const isTotalProfitNegative = totalProfit.includes('-');

  if (isVoidDay) {
    return (
      <div className={`Day ${isVoidDay ? 'void' : ''}`}></div>
    )
  }

  return (
    <div 
      className={`
        Day p-1 
        ${!isVoidDay ? 'date' : ''} 
        ${numberOfTrades < 0 ? 'bg-white text-black' : ''} 
        ${numberOfTrades && isTotalProfitNegative ? 'bg-red-800 text-white' : ''} 
        ${numberOfTrades && !isTotalProfitNegative ? 'bg-green-700 text-white' : ''} 
        ${isActiveDay ? 'border-4 border-yellow-500' : ''}
      `} 
      id={`${month}-${date}-${year}`}
      onClick={() => onSelectDay({ month, date, year, trades })}
    >
      <span class="date-label">{date}</span>
      {numberOfTrades > 0 
        ? (
          <div class="daily-stat py-1">
          {!!totalProfit ? (
            <p class="profit items-center mb-1">
              <span class="label text-gray-300 font-light">P/L</span>
              <span class="text-xs font-bold">${totalProfit}</span>
            </p>
          ) : ''}
          {!!numberOfTrades ? (
            <p class="number-of-trades pb-1">
              <span class="label text-gray-300 font-light">Trades</span>
              <span class="ml-2 font-bold">{numberOfTrades}</span>
            </p>
          ) : ''}
          {!!tickers ? (
            <p class="tickers border-t border-gray-300 text-gray justify-center pt-1">
              <span class="text-gray-300 font-light">{tickers}</span>
            </p>
          ) : ''}
        </div>
        ) 
        : ''
      }
    </div>
  );
}

export default Day;
