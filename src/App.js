import React, { Component } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './App.css';
import MonthlyCalendar from './MonthlyCalendar/MonthlyCalendar';
import { getUserFromLocalStorage, getTickersFromTrades, getTotalProfitFromTrades } from './utils';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getUserFromLocalStorage(),
      allTradeLogs: [],
    }
  }

  render() {
    return (
      <div className="App Dashboard">
        <MonthlyCalendar {...this.props} {...this.state} />
      </div>
    ); 
  }
}

export default App;




// const Day = (props) => {
//   const { 
//     isVoidDay = false, 
//     month = 'October', 
//     date = '10', 
//     year = '2021', 
//     trades = [], 
//     isActiveDay = false,
//   } = props;

//   const totalProfit = getTotalProfitFromTrades(trades);
//   const tickers = getTickersFromTrades(trades);
//   const numberOfTrades = trades?.length || 0;
//   const isTotalProfitNegative = totalProfit < 0;

//   console.log({ date, totalProfit, tickers, numberOfTrades });

//   if (isVoidDay) {
//     return (
//       <div className={`Day ${isVoidDay ? 'void' : ''}`}></div>
//     );
//   }

//   return (
//     <div 
//       className={`
//         Day p-1 
//         ${!isVoidDay ? 'date' : ''} 
//         ${numberOfTrades < 0 ? 'bg-light text-black' : ''} 
//         ${numberOfTrades && isTotalProfitNegative ? 'bg-danger text-white' : ''} 
//         ${numberOfTrades && !isTotalProfitNegative 
//           ? 'bg-success text-white' : ''} 
//         ${isActiveDay ? 'border border-warning border-4' : ''}
//       `} 
//       id={`${month}-${date}-${year}`}
//     >

//       <span className="date-label">{date}</span>

//       {numberOfTrades > 0 
//         ? (
//           <div className="daily-stat p-2">
//             {!!totalProfit ? (
//               <p className="profit mt-1 mb-1 border-bottom border-light">
//                 <span className="label">Profit</span>
//                 <span className="value">{totalProfit}</span>
//               </p>
//             ) : ''}
//             {!!numberOfTrades ? (
//               <p className="number-of-trades mt-1 mb-1 border-bottom border-light">
//                 <span className="label"># Trades</span>
//                 <span className="value">{numberOfTrades}</span>
//               </p>
//             ) : null}
//             {!!tickers ? (
//               <p className="tickers mt-1 mb-1">
//                 <span className="value">{tickers}</span>
//               </p>
//             ) : null}
//           </div>
//         ) : null
//       }
//     </div>
//   );
// };

