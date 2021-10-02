import { getDateFromDate, getMonthFromDate, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { fetchStocksByMonthAndYear } from "../utils/stocks";
import { createNewTradeLog, fetchAllTradesByUserId } from "../vendors/firebase/firebase.firestore";
import AddTradeModal from "./AddTradeModal";
import MonthlyCalendar from "./MonthlyCalendar";
import TICKERS from '../assets/data/tickers.json';

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
  const { activeDate, user } = props;
  const userId = user.uid;

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
  const numberOfSharesRange = document.querySelector(`.${componentId} #numberOfShares`);
  const numberOfSharesRangeValue = document.querySelector(`.${componentId} #range-value`);

  const customTickerBtn = document.querySelector(`.${componentId} #custom-ticker-btn`);
  const selectDefaultTickerBtn = document.querySelector(`.${componentId} #select-default-ticker-btn`);
  const tickerInputBlock = document.querySelector(`.${componentId} #ticker-input-block`);
  const tickerOrganizationBlock = document.querySelector(`.${componentId} #organization-input-block`);
  const tickerSelectBlock = document.querySelector(`.${componentId} #ticker-select-block`);
  const tickerInput = document.querySelector(`.${componentId} .AddTradeForm #ticker`);
  const organizationInput = document.querySelector(`.${componentId} .AddTradeForm #organization`);

  const addTradeFormError = document
    .querySelector(`.${componentId} #add-trade-form-error`);

  const showAddTradeFormModal = () => {
    addTradeFormModal.show();
  }

  const hideAddTradeFormModal = () => {
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
    const isTickerInputHidden = tickerInputBlock.classList.contains('hide');

    if (isTickerInputHidden) {
      return {
        error: null,
        isValid: true,
      }
    }

    if (!ticker || !ticker.length) {
      return {
        error: 'Please provide a valid ticker',
        isValid: false, 
      }
    }
    
    if (ticker.includes(' ')) {
      return {
        error: 'Ticker must not have any spaces',
        isValid: false, 
      }
    }

    return {
      error: null,
      isValid: true,
    }
  } 

  // validate each field for new trade log
  const validateOrganization = (organization) => {
    const isTickerInputHidden = tickerInputBlock.classList.contains('hide');

    if (isTickerInputHidden) {
      return {
        error: null,
        isValid: true,
      }
    }

    if (!organization || !organization.length) {
      return {
        error: 'Please provide a valid organization or company',
        isValid: false, 
      }
    }
    return {
      error: null,
      isValid: true,
    }
  } 

  // validate each field for new trade log
  const validateTickerSelect = (tickerSelect) => {
    const isTickerInputHidden = tickerInputBlock.classList.contains('hide');

    if (!isTickerInputHidden) {
      return {
        error: null,
        isValid: true,
      }
    }

    if (!tickerSelect || !tickerSelect.length || tickerSelect === 'Select a ticker') {
      return {
        error: 'Please choose a ticker',
        isValid: false, 
      }
    }
    return {
      error: null,
      isValid: true,
    }
  }  

  // validate each field for new trade log
  const validateOpeningPrice = (openingPrice) => {
    if (!openingPrice) {
      return {
        error: 'Please provide a valid opening price',
        isValid: false, 
      }
    }
    return {
      error: null,
      isValid: true,
    }
  } 
  
  // validate each field for new trade log
  const validateClosingPrice = (closingPrice) => {
    if (!closingPrice) {
      return {
        error: 'Please provide a valid closing price',
        isValid: false, 
      }
    }
    return {
      error: null,
      isValid: true,
    }
  }  

  // validate each field for new trade log
  const validateStopLoss = (stopLoss) => {
    if (!stopLoss) {
      return {
        error: 'Please provide a valid stop loss price',
        isValid: false, 
      }
    }
    return {
      error: null,
      isValid: true,
    }
  }  

  // validate each field for new trade log
  const validateTakeProfit = (takeProfit) => {
    if (!takeProfit) {
      return {
        error: 'Please provide a valid take profit price',
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
    
    const { error: organizationError, isValid: isOrganizationValid } = validateOrganization(fields.organization);
    if (!isOrganizationValid) {
      return {
        error: organizationError,
        isValid: false,
      }
    }

    const { error: tickerSelectError, isValid: isTickerSelectValid } = validateTickerSelect(fields.tickerSelect);
    if (!isTickerSelectValid) {
      return {
        error: tickerSelectError,
        isValid: false,
      }
    }

    const { error: openingPriceError, isValid: isOpeningPriceValid } = validateOpeningPrice(fields.openingPrice);
    if (!isOpeningPriceValid) {
      return {
        error: openingPriceError,
        isValid: false,
      }
    }

    const { error: closingPriceError, isValid: isClosingPriceValid } = validateClosingPrice(fields.closingPrice);
    if (!isClosingPriceValid) {
      return {
        error: closingPriceError,
        isValid: false,
      }
    }

    const { error: stopLossError, isValid: isStopLossValid } = validateStopLoss(fields.stopLoss);
    if (!isStopLossValid) {
      return {
        error: stopLossError,
        isValid: false,
      }
    }

    const { error: takeProfitError, isValid: isTakeProfitValid } = validateTakeProfit(fields.takeProfit);
    if (!isTakeProfitValid) {
      return {
        error: takeProfitError,
        isValid: false,
      }
    }

    return {
      error: null,
      isValid: true,
    }
  }

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

  const sanitizeAddTradeFields = (fields) => {
    let sanitizedFields = {};

    for (const [key, value] of Object.entries(fields)) {
      // sanitize each field as needed...
      if (key === 'ticker') {
        sanitizedFields[key] = value.trim().toUpperCase();
      } else if (key === 'organization') {
        sanitizedFields[key] = value.trim().replace(/\s+/g,' ');
      } else if (key === 'numberOfShares') {
        sanitizedFields[key] = parseInt(value.trim());
      } else if (key === 'openingPrice') {
        sanitizedFields[key] = parseFloat(value.trim()).toFixed(2);
      } else if (key === 'closingPrice') {
        sanitizedFields[key] = parseFloat(value.trim()).toFixed(2);
      } else if (key === 'stopLoss') {
        sanitizedFields[key] = parseFloat(value.trim()).toFixed(2);
      } else if (key === 'takeProfit') {
        sanitizedFields[key] = parseFloat(value.trim()).toFixed(2);
      } else {
        sanitizedFields[key] = value
      };
    }

    return sanitizedFields;
  }

  const getTickerFromOrganization = (org) => {
    return TICKERS
      .find(ticker => 
        ticker.organization.toLowerCase() === org.toLowerCase()
      ).ticker;
  }

  const formatFields = (fields) => {
    const ticker = fields.ticker 
      ? fields.ticker 
      : getTickerFromOrganization(fields.tickerSelect);
    const organization = fields.organization 
      ? fields.organization
      : fields.tickerSelect;
    return {
      ticker,
      name: organization,
      numberOfShares: fields.numberOfShares,
      openingPrice: fields.openingPrice,
      closingPrice: fields.closingPrice,
      stopLoss: fields.stopLoss,
      takeProfit: fields.takeProfit,
      notes: fields.notes,
    }
    // return data;
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

    // show error message in DOM for user
    if (!isFormValid) {
      // displays form field error in DOM
      return showAddTradeFormError(formError);
    }
    // hides or removes any form field from DOM
    resetAddTradeFormError();

    // sanitize form fields
    const sanitizedFields = sanitizeAddTradeFields(fields);
    console.log({ sanitizedFields });

    const formattedFields = formatFields(sanitizedFields);

    // creates new trade for user by taking in form fields
    const { isNewTradeCreated, error } = await createNewTradeLog({ 
      ...formattedFields,
      date: String(getDateFromDate(activeDate)),
      month: String(getMonthFromDate(activeDate)), 
      year: String(getYearFromDate(activeDate)),
    }, userId);
    console.log({ isNewTradeCreated, error });

    // display potential add trade error from firebase store
    if (error) {
      return showAddTradeFormError(error || 'Unable to add trade now. Try again later');
    } 
    // clears the sign up form fields in DOM
    addTradeForm.reset();

    // close out add trade form modal
    hideAddTradeFormModal();
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

  const updateNumberOfSharesValue = (e = {}) => {
    e.preventDefault();
    const numberOfShares = e.target?.value || 1;
    console.log({ numberOfShares });
    numberOfSharesRangeValue.innerHTML = numberOfShares;
  }

  const showTickerMatches = (e) => {
    e.preventDefault();
    const tickerInputValue = e.target?.value || '';
    console.log({ tickerInputValue });
    const matchingTickers = TICKERS.filter(ticker => ticker.ticker.toLowerCase().includes(tickerInputValue.toLowerCase()));
    console.log({ matchingTickers });
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
  numberOfSharesRange.addEventListener('change', updateNumberOfSharesValue);
  // tickerInput.addEventListener('change', showTickerMatches);
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