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
        ${numberOfTrades && isTotalProfitNegative ? 'bg-red-600 text-white' : ''} 
        ${numberOfTrades && !isTotalProfitNegative ? 'bg-green-700 text-white' : ''} 
        ${isActiveDay ? 'border-4 border-yellow-500' : ''}
      `} 
      id={`${month}-${date}-${year}`}
      onClick={() => onSelectDay({ month, date, year, trades })}
    >
      <span class="date-label sm:block">{date}</span>
      {numberOfTrades > 0 
        ? (
          <div class="daily-stat py-1">
          {!!totalProfit ? (
            <p class="profit items-center mb-1 hidden sm:block">
              <span class="label text-gray-300 font-light hidden sm:block">P/L</span>
              <span class="text-xs font-bold hidden sm:block">${totalProfit}</span>
            </p>
          ) : ''}
          {!!numberOfTrades ? (
            <p class="number-of-trades pb-1 hidden sm:block">
              <span class="label text-gray-300 font-light hidden sm:block">Trades</span>
              <span class="ml-2 font-bold hidden sm:block">{numberOfTrades}</span>
            </p>
          ) : ''}
          {!!tickers ? (
            <p class="tickers border-opacity-0 sm:border-opacity-100 border-t sm:border-gray-300 text-gray pt-1 hidden sm:block">
              <span class="text-gray-300 font-light hidden sm:block">{tickers}</span>
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
