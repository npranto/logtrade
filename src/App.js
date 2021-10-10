import React, { Component } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './App.css';

const MonthlyCalendar = props => {
  return (
    <section className="MonthlyCalendar">
      <header className="flex py-2 px-2 justify-between flex-wrap">
        <MonthNavigator className="pr-2" />
        <h1 className="active-date sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 pr-2 text-center">November 1, 2021</h1>
        <div className="monthly-stats flex pr-2">
          <p className="gains pr-2">
            <sub className="text-gray-900">Gains: </sub> 
            <span className="text-green-900 title-font sm:text-4xl text-3xl font-medium"> $254 </span>
          </p>
          <p className="losses text-red-900 pr-2">
            <sub className="text-gray-900">Losses: </sub> 
            <span className="text-red-900 title-font sm:text-4xl text-3xl font-medium"> $100 </span>
          </p>
          <p className="p-l text-gray-900 pr-2">
            <sub className="text-gray-900">P/L: </sub> 
            <span className="text-gray-900 title-font sm:text-4xl text-3xl font-medium"> $154 </span> 
          </p>
        </div>
      </header>
    </section>
  )
};

const MonthNavigator = (props = {}) => {
  const { 
    prevMonth = 'October', 
    nextMonth = 'December', 
  } = props;
  
  // if (!prevMonth || !nextMonth) return ``;

  return (
    <div class="MonthNavigator flex items-center">
      <button type="button" class="inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-small text-white bg-indigo-600 hover:bg-indigo-700">
        <AiOutlineArrowLeft className="mr-1" /> {prevMonth}
      </button>

      <button type="button" class="inline-flex items-center justify-center px-2 py-1 ml-1 border border-transparent text-base font-small text-white bg-indigo-600 hover:bg-indigo-700">
        {nextMonth} <AiOutlineArrowRight className="ml-1" />
      </button>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todayDate: new Date(),
      activeDate: new Date(),
      tradeLogs: [],
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
