import { getMonthFromDate, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { fetchStocksByMonthAndYear } from "../utils/stocks";
import { fetchAllTradesByUserId } from "../vendors/firebase/firebase.firestore";
import AddTradeModal from "./AddTradeModal";
import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const filterTradesByMonthAndYear = (trades = [], month, year) => {
  return trades.filter(trade => trade.month === month && trade.year === year);
}

const getTradesByMonthAndYear = async (props) => {
  const { user, activeDate } = props;
  const { uid } = user || {};
  const activeMonth = getMonthFromDate(activeDate);  // i.e., "February"
  const activeYear = getYearFromDate(activeDate).toString();    // i.e., 2020

  const fetchedAllTrades = await fetchAllTradesByUserId(uid);
  const filteredTradesByMonthAndYear = filterTradesByMonthAndYear(
    fetchedAllTrades,
    activeMonth,
    activeYear,
  );
  console.log({ fetchedAllTrades, filteredTradesByMonthAndYear });
  props.setState(() => {
    return { tradeLogs: filteredTradesByMonthAndYear }; 
  });
}

const listenForClickOnAddTradeAction = (props) => {
  const addTradeBtn = document
    .querySelector(`.${componentId} #add-trade-btn`);
  const addTradeConfirmBtnModal = document
    .querySelector(`.${componentId} #add-trade-confirm-btn-modal`);
  const addTradeCancelIconModal = document
    .querySelector(`.${componentId} #add-trade-cancel-icon-modal`)
  const addTradeCancelBtnModal = document
    .querySelector(`.${componentId} #add-trade-cancel-btn-modal`);
  const addTradeFormModal = new bootstrap.Modal(
    document.querySelector(`.${componentId} #add-trade-form-modal`), {}
  );

  const showAddTradeFormModal = () => {
    addTradeFormModal.show();
  }

  const hideAddTradeFormModal = () => {
    console.log('sdjfjhsdfjh...');
    addTradeFormModal.hide();
  }

  const onAddTrade = async () => {
    console.log('Now... lets add trade to DB!');
    props.setState(() => ({ newTrade: { ticker: 'AAPL' } }));
  }
  
  addTradeBtn
    .addEventListener('click', showAddTradeFormModal);
  addTradeCancelIconModal
    .addEventListener('click', hideAddTradeFormModal);
  addTradeConfirmBtnModal
    .addEventListener('click', onAddTrade);
  addTradeCancelBtnModal
    .addEventListener('click', hideAddTradeFormModal);
}

const onLoad = (props = {}) => {
  getTradesByMonthAndYear(props);
  listenForClickOnAddTradeAction(props);
}

const styles = () => `
  .${componentId} {
    padding: 1em;
  }
  .${componentId} .add-trade-btn {
    cursor: pointer;
    position: fixed;
    bottom: 0;
    right: 0;
    background: green;
    color: white;
    padding-top: 2em;
    padding-bottom: 1.5em;
    padding-left: 1.5em;
    padding-right: 1em;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 55px;
    background-color: black;
    color: whitesmoke;
    transition: box-shadow font-size 0.4s ease;
  }
  .${componentId} .add-trade-btn:hover, 
  .${componentId} .add-trade-btn:focus {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .${componentId} .add-trade-btn svg, 
  .${componentId} .add-trade-btn svg {
    transition: font-size 0.2s ease;
  }
  .${componentId} .add-trade-btn:hover svg, 
  .${componentId} .add-trade-btn:focus svg {
    font-size: 1.75rem;
  }
`;

const Calendar = (props = {}) => {
  const { dateToday, activeDate, tradeLogs, user } = props;

  console.log({ dateToday, activeDate, user, tradeLogs });

  const onUpdateActiveDate = (newDate) => {
    if (!newDate || !(newDate instanceof Date)) {
      throw new Error(
        'Invalid `newDate` is passed to update active day. Please pass in a valid `Date` object to alter active date.'
      );
    }
    props.setState(() => {
      return { activeDate: newDate };
    });
  }

  const onAddTrade = (newTrade) => {
    console.log('running onAddTrade()...');
  }

  return `
    <section class="Calendar ${componentId}">
      <h1 class="header text-center">Calendar</h1>
      ${MonthlyCalendar({ 
        dateToday,
        activeDate, 
        tradeLogs,
        onUpdateActiveDate,
      })}
      <div 
        class="add-trade-btn" 
        id="add-trade-btn"
        data-toggle="modal"
        data-target="#add-trade-btn"
      >
        <i class="fas fa-plus fa-lg"></i>
      </div>

      ${AddTradeModal({
        ...props,
        onAddTrade
      })}
    </section>
  `
};

export default (props) => render(
  props, 
  componentId, 
  Calendar, 
  styles, 
  onLoad,
  null,
);