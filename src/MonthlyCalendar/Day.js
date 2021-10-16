import { getTickersFromTrades, getTotalProfitFromTrades } from "../utils";

const Day = props => {
  // console.log({ props });
  const { 
    isVoidDay, month, date, year, trades, isActiveDay, onSelectDay, isTodayDate
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
        ${!isVoidDay ? 'date bg-white' : ''} 
        ${numberOfTrades < 0 ? 'bg-white text-black' : ''} 
        ${numberOfTrades && isTotalProfitNegative ? 'bg-red-600 text-white' : ''} 
        ${numberOfTrades && !isTotalProfitNegative ? 'bg-green-700 text-white' : ''} 
        ${isTodayDate ? 'border-4 border-yellow-500' : ''}
        ${isActiveDay ? 'shadow' : ''}
      `} 
      id={`${month}-${date}-${year}`}
      onClick={() => onSelectDay({ month, date, year, trades })}
    >
      <span className="date-label sm:block">{date}</span>
      {numberOfTrades > 0 
        ? (
          <div className="daily-stat sm:py-1">
          {!!totalProfit ? (
            <p className="profit items-center mb-1 hidden sm:flex sm:justify-between sm:flex-wrap">
              <span className="label text-gray-300 font-light hidden sm:block">P/L</span>
              <span className="text-xs font-bold hidden sm:block">${totalProfit}</span>
            </p>
          ) : ''}
          {!!numberOfTrades ? (
            <p className="number-of-trades pb-1 hidden sm:flex sm:justify-between sm:flex-wrap">
              <span className="label text-gray-300 font-light hidden sm:block">Trades</span>
              <span className="ml-2 font-bold hidden sm:block">{numberOfTrades}</span>
            </p>
          ) : ''}
          {!!tickers ? (
            <p className="tickers border-opacity-0 sm:border-opacity-100 border-t sm:border-gray-300 text-gray pt-1 hidden sm:flex sm:justify-between sm:flex-wrap">
              <span className="text-gray-300 font-light hidden sm:block">{tickers}</span>
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
