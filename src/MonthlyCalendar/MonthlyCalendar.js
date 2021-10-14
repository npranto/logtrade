import React, { Component } from "react";
import { filterTradesByMonthAndYear, getDateFromDate, getMonthFromDate, getNextMonthFromDate, getPrevMonthFromDate, getStatsFromTrades, getYearFromDate } from "../utils";
import AddNewTradeBtn from "./AddNewTradeBtn";
import AddNewTradeFormModal from "./AddNewTradeFormModal";
import DailyTradesModal from "./DailyTradesModal";
import MonthlyCalendarGrid from "./MonthCalendarGrid";
import MonthlyStats from "./MonthlyStats";
import MonthNavigator from "./MonthNavigator";

class MonthlyCalendar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todayDate: new Date(),
      activeDate: new Date(),
      // activeDate: new Date(`December 10, 2021`),
      // activeMonthTradeLogs: [],
      showDailyTradesModal: false,
      showAddNewTradeFormModal: true,
    }

    // this.fetchActiveMonthTradeLogs = this.fetchActiveMonthTradeLogs.bind(this);
    this.onClickOnPrevMonth = this.onClickOnPrevMonth.bind(this);
    this.onClickOnNextMonth = this.onClickOnNextMonth.bind(this);
    this.onSelectDay = this.onSelectDay.bind(this);
    this.setShowDailyTradesModal = this.setShowDailyTradesModal.bind(this);
    this.setShowAddNewTradeFormModal = this.setShowAddNewTradeFormModal.bind(this);
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

  // async fetchActiveMonthTradeLogs() {
  //   const { activeDate, user } = this.state;
  //   const userId = user?.uid || {};

  //   const activeMonth = getMonthFromDate(activeDate);  // i.e., "February"
  //   const activeYear = getYearFromDate(activeDate).toString();    // i.e., 2020
    
  //   // const fetchedAllTrades = await fetchAllTradesByUserId(userId);
  //   // const filteredTradesByMonthAndYear = filterTradesByMonthAndYear(
  //   //   fetchedAllTrades,
  //   //   activeMonth,
  //   //   activeYear,
  //   // );
  //   // console.log({ fetchedAllTrades, filteredTradesByMonthAndYear });
  //   // props.setState(() => {
  //   //   return { tradeLogs: filteredTradesByMonthAndYear }; 
  //   // });
  // }
 
  componentDidMount() {
    // this.fetchActiveMonthTradeLogs();
  }

  onClickOnPrevMonth = () => {
    const { activeDate } = this.state;
    console.log('click on prev month detected...');
    const firstOfPrevMonth = getPrevMonthFromDate(activeDate);
    this.setState({ activeDate: firstOfPrevMonth });
  }

  onClickOnNextMonth = () => {
    const { activeDate } = this.state;
    console.log('click on next month detected...');
    const firstOfNextMonth = getNextMonthFromDate(activeDate);
    this.setState({ activeDate: firstOfNextMonth });
  }

  setShowDailyTradesModal(status = false) {
    this.setState({ showDailyTradesModal: status })
  }

  setShowAddNewTradeFormModal(status = false) {
    this.setState({ showAddNewTradeFormModal: status })
  }

  onSelectDay({ month, date, year }) {
    this.setState({ activeDate: new Date(`${month} ${date}, ${year}`) });
    this.setShowDailyTradesModal(true);
  }

  render() {
    const { allTradeLogs } = this.props;
    const { activeDate, showDailyTradesModal, showAddNewTradeFormModal } = this.state;

    const activeDateDate = getDateFromDate(activeDate).toString();  // i.e., "February"
    const activeMonth = getMonthFromDate(activeDate);  // i.e., "February"
    const activeYear = getYearFromDate(activeDate).toString();    // i.e., 2020
    
    const activeTradeLogs = filterTradesByMonthAndYear(
      allTradeLogs, 
      activeMonth, 
      activeYear
    );

    const { gains, losses, profit } = getStatsFromTrades(activeTradeLogs);

    console.log({ activeTradeLogs, gains, losses, profit });
    
    return (
      <article className="MonthlyCalendar">
        <header className="flex py-2 px-2 justify-between items-center flex-wrap">
          <MonthNavigator
            prevMonth={getMonthFromDate(getPrevMonthFromDate(activeDate))}
            nextMonth={getMonthFromDate(getNextMonthFromDate(activeDate))}
            onClickOnPrevMonth={this.onClickOnPrevMonth}
            onClickOnNextMonth={this.onClickOnNextMonth}
          />
          <h1 className="active-date sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center"> {activeMonth} {activeDateDate}, {activeYear} </h1>
          <MonthlyStats
            gains={gains}
            losses={losses}
            profit={profit}
          />
        </header>
        
        <section>
          <MonthlyCalendarGrid 
            {...this.state} 
            activeDateDate={activeDateDate}
            activeMonth={activeMonth}
            activeYear={activeYear}
            activeTradeLogs={activeTradeLogs} 
            onSelectDay={this.onSelectDay}
          />
        </section>

        <AddNewTradeBtn onClick={() => this.setShowAddNewTradeFormModal(true)} />

        {showDailyTradesModal && (
          <DailyTradesModal
            activeDateDate={activeDateDate}
            activeMonth={activeMonth}
            activeYear={activeYear}
            activeTradeLogs={activeTradeLogs}
            onClose={() => this.setShowDailyTradesModal(false)}
          />
        )}

        {showAddNewTradeFormModal && (
          <AddNewTradeFormModal
            activeDateDate={activeDateDate}
            activeMonth={activeMonth}
            activeYear={activeYear}
            // activeTradeLogs={activeTradeLogs}
            onClose={() => this.setShowAddNewTradeFormModal(false)}
          />
        )}

      </article>
    )
  }
}

export default MonthlyCalendar;