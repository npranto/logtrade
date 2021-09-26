import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
  const {
    onClickOnPrevMonth, 
    onClickOnNextMonth,
  } = props;

  // elements
  const prevMonthBtn = document.querySelector(`.${componentId} #prev-month`);
  const nextMonthBtn = document.querySelector(`.${componentId} #next-month`);

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', onClickOnPrevMonth);
  }
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', onClickOnNextMonth);
  }
}

const styles = () => `
  .${componentId} {
    display: flex;
    justify-content: space-between;
  }
  .${componentId} .fa-arrow-left, .${componentId} .fa-arrow-right {
    transition: margin 0.4s ease;
  }
  .${componentId} .prev-month:hover .fa-arrow-left {
    margin-right: 10px;
  }
  .${componentId} .next-month:hover .fa-arrow-right {
    margin-left: 10px;
  }
`;

const MonthlyNavigator = (props = {}) => {
  const { 
    prevMonth, 
    nextMonth, 
  } = props;
  
  if (!prevMonth || !nextMonth) return ``;

  return `
    <div class="MonthlyNavigator mb-3 ${componentId}">
      <button type="button" class="btn btn-outline-dark prev-month" id="prev-month">
        <i class="fas fa-arrow-left"></i> ${prevMonth}
      </button>
      <button type="button" class="btn btn-outline-dark next-month" id="next-month">
        ${nextMonth} <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `
};

export default (props) => render(
  props, 
  componentId, 
  MonthlyNavigator, 
  styles, 
  onLoad,
);