import React, { Component } from 'react';
import './Dashboard.css';
import MonthlyCalendar from './MonthlyCalendar/MonthlyCalendar';
import { getActivePage, getUserFromLocalStorage } from './utils';
import { fetchAllTradesByUserId } from './vendors/firebase/firebase.firestore';
import Nav from './Nav';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getUserFromLocalStorage(),
      allTradeLogs: [],
    }

    this.fetchAllTrades = this.fetchAllTrades.bind(this);
  }

  async fetchAllTrades() {
    // const { user } = this.state;
    
    // if (!user || user === null) return;

    // const { uid: userId } = user || {};

    // const fetchedTradeLogs = await fetchAllTradesByUserId(userId);
    
    this.setState({ 
      allTradeLogs: [
        {
          closingPrice: "8.00",
          date: "12",
          month: "October",
          notes: "",
          numberOfShares: 2,
          openingPrice: "10.00",
          stopLoss: "9.00",
          takeProfit: "15.00",
          ticker: "LOL",
          tradeId: "sd7f7f8d57fd",
          year: "2021",
          tradeType: 'long',
          vwap: 'over',
        },
        {
          closingPrice: "12.00",
          date: "14",
          month: "October",
          notes: "",
          numberOfShares: 2,
          openingPrice: "10.00",
          stopLoss: "9.00",
          takeProfit: "15.00",
          ticker: "GOOGL",
          tradeId: "g76df7dg76fg6",
          year: "2021",
          tradeType: 'long',
          vwap: 'over',
        },
        {
          closingPrice: "8.00",
          date: "14",
          month: "October",
          notes: "No way!",
          numberOfShares: 2,
          openingPrice: "10.00",
          stopLoss: "9.00",
          takeProfit: "15.00",
          ticker: "GOOGL",
          tradeId: "df678d867fg",
          year: "2021",
          tradeType: 'long',
          vwap: 'over',
        }
      ],
      // allTradeLogs: fetchedTradeLogs 
    });
  }

  componentDidMount() {
    this.fetchAllTrades();
  }

  render() {
    console.log({ props: this.props, state: this.state });
    return (
      <div className="App Dashboard">
        {/* <Nav user={this.state.user} isLoggedIn={this.state.user !== null} activePage={getActivePage()} /> */}
        <MonthlyCalendar {...this.props} {...this.state} refetchAllTrades={this.fetchAllTrades} />
      </div>
    ); 
  }
}

export default Dashboard;




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

