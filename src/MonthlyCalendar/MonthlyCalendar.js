import React, { Component } from "react";
import { getMonthFromDate, getYearFromDate } from "../utils";
import MonthlyCalendarGrid from "./MonthCalendarGrid";
import MonthlyStats from "./MonthlyStats";
import MonthNavigator from "./MonthNavigator";

class MonthlyCalendar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todayDate: new Date(),
      activeDate: new Date(),
      activeMonthTradeLogs: [],
    }

    this.fetchActiveMonthTradeLogs = this.fetchActiveMonthTradeLogs.bind(this);
  }

  // getTradesByMonthAndYear = async (props) => {
  //   const { user, activeDate } = props;
  //   const { uid } = user || {};
  //   const activeMonth = getMonthFromDate(activeDate);  // i.e., "February"
  //   const activeYear = getYearFromDate(activeDate).toString();    // i.e., 2020
  
  //   const fetchedAllTrades = await fetchAllTradesByUserId(uid);
  //   const filteredTradesByMonthAndYear = filterTradesByMonthAndYear(
  //     fetchedAllTrades,
  //     activeMonth,
  //     activeYear,
  //   );
  //   console.log({ fetchedAllTrades, filteredTradesByMonthAndYear });
  //   props.setState(() => {
  //     return { tradeLogs: filteredTradesByMonthAndYear }; 
  //   });
  // }

  async fetchActiveMonthTradeLogs() {
    const { activeDate, user } = this.state;
    const userId = user?.uid || {};

    const activeMonth = getMonthFromDate(activeDate);  // i.e., "February"
    const activeYear = getYearFromDate(activeDate).toString();    // i.e., 2020
    
    // const fetchedAllTrades = await fetchAllTradesByUserId(userId);
    // const filteredTradesByMonthAndYear = filterTradesByMonthAndYear(
    //   fetchedAllTrades,
    //   activeMonth,
    //   activeYear,
    // );
    // console.log({ fetchedAllTrades, filteredTradesByMonthAndYear });
    // props.setState(() => {
    //   return { tradeLogs: filteredTradesByMonthAndYear }; 
    // });
  }
 
  componentDidMount() {
    this.fetchActiveMonthTradeLogs();
  }

  render() {
    return (
      <article className="MonthlyCalendar">
        <header className="flex py-2 px-2 justify-between items-center flex-wrap">
          <MonthNavigator className="" />
          <h1 className="active-date sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center"> November 1, 2021 </h1>
          <MonthlyStats />
        </header>
        
        <section>
          <MonthlyCalendarGrid />
        </section>
      </article>
    )
  }
}

export default MonthlyCalendar;