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
  const addTradeForm = document
    .querySelector(`.${componentId} #add-trade-form`);

  const customTickerBtn = document.querySelector(`.${componentId} #custom-ticker-btn`);
  const selectDefaultTickerBtn = document.querySelector(`.${componentId} #select-default-ticker-btn`);
  const tickerInputBlock = document.querySelector(`.${componentId} #ticker-input-block`);
  const tickerOrganizationBlock = document.querySelector(`.${componentId} #organization-input-block`);
  const tickerSelectBlock = document.querySelector(`.${componentId} #ticker-select-block`);

  const addTradeFormError = document
    .querySelector(`.${componentId} #add-trade-form-error`);

  const showAddTradeFormModal = () => {
    addTradeFormModal.show();
  }

  const hideAddTradeFormModal = () => {
    console.log('sdjfjhsdfjh...');
    addTradeFormModal.hide();
  }

  const extractFormFields = () => {
    // extract out fields for new trade log
    const ticker = addTradeForm['ticker']?.value || '';
    const organization = addTradeForm['organization']?.value || '';
    const tickerSelect = addTradeForm['tickerSelect']?.value === 'Select a ticker'
      ? '' : addTradeForm['tickerSelect']?.value;
    const numberOfShares = addTradeForm['numberOfShares']?.value || 1;
    const openingPrice = addTradeForm['openingPrice']?.value || '';
    const closingPrice = addTradeForm['closingPrice']?.value || '';
    const stopLoss = addTradeForm['stopLoss']?.value || '';
    const takeProfit = addTradeForm['takeProfit']?.value || '';
    const notes = addTradeForm['notes']?.value || '';
    const fields =  {
      ticker,
      organization,
      tickerSelect,
      numberOfShares,
      openingPrice,
      closingPrice,
      stopLoss,
      takeProfit,
      notes,
    }
    console.log({ fields });
    return fields;
  }

  // validate each field for new trade log
  const validateTicker = (ticker) => {
    if (!ticker || !ticker.length) {
      return {
        error: 'Please provide a valid ticker',
        isValid: false, 
      }
    }
    return {
      error: null,
      isValid: true,
    }
  } 

  const validateAddTradeForm = (fields = {}) => {
    const { error: tickerError, isValid: isTickerValid } = validateTicker(fields.ticker);

    if (!isTickerValid) {
      return {
        error: tickerError,
        isValid: false,
      }
    }

    return {
      error: null,
      isValid: true,
    }
  }

  const onAddTrade = async (e) => {
    e.preventDefault();

    // extracts out each form field in name / value pairs
    // i.e., { email: '...', password: '...' ... }
    const fields = extractFormFields();

    // takes in all form fields, validates each one-by-one and returns 
    // data regarding form validity
    const { 
      error: formError, 
      isValid: isFormValid,
    } = validateAddTradeForm(fields);

    
    const { error: tickerError, isValid: isTickerValid } = validateTicker(fields.ticker);
    console.log({ tickerError, isTickerValid });

    // takes in an error message and displays it on top of add trade form
    const showAddTradeFormError = (message) => {
      addTradeFormError.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
          ${message}
        </div>
      `;
      addTradeFormError.scrollIntoView();
    };
    
    // resets add trade form error message
    const resetAddTradeFormError = () => addTradeFormError.innerHTML = '';


    // show error message in DOM for user
    if (!isTickerValid) {
      // displays form field error in DOM
      return showAddTradeFormError(tickerError);
    }
    // hides or removes any form field from DOM
    resetAddTradeFormError();
  }

  const showCustomTickerOption = () => {
    tickerInputBlock.classList.remove('hide');
    tickerOrganizationBlock.classList.remove('hide');
    tickerSelectBlock.classList.add('hide');
  }

  const showSelectTickerOption = () => {
    tickerInputBlock.classList.add('hide');
    tickerOrganizationBlock.classList.add('hide');
    tickerSelectBlock.classList.remove('hide');
  }
  
  addTradeBtn
    .addEventListener('click', showAddTradeFormModal);
  addTradeCancelIconModal
    .addEventListener('click', hideAddTradeFormModal);
  addTradeConfirmBtnModal
    .addEventListener('click', onAddTrade);
  addTradeCancelBtnModal
    .addEventListener('click', hideAddTradeFormModal);

  customTickerBtn.addEventListener('click', showCustomTickerOption);
  selectDefaultTickerBtn.addEventListener('click', showSelectTickerOption);
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

      ${AddTradeModal({...props})}
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