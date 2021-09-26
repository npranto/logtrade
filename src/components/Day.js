import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
// import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const listenForClickOnDay = (props) => {
  const { month, date, year, onClick } = props;

  const dayBlock = document.querySelector(`#${month}-${date}-${year}`);
  // console.log({ dayBlock });

  if (dayBlock) {
    // console.log('setting up day block click event...');
    dayBlock.addEventListener('click', onClick);
  }
}

const onLoad = (props = {}) => {
  listenForClickOnDay(props);
}

const styles = (props) => `
  .${props.key || componentId} {
    border: 1px solid lightgrey; 
  }
  .${props.key || componentId}.date {
    cursor: pointer;
    border-bottom-right-radius: 5px;
    background: maroon; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.75rem;
  }
  .${props.key || componentId}.void {
    width: 100%;
    height: 100%;
    background: lightgrey;
    cursor: not-allowed;
  }
`;

const Day = (props = {}) => {
  const { isVoidDay, month, date, year, stock } = props;
  console.log({ month, date, year, stock });

  if (isVoidDay) {
    return `
      <div class="Day ${props.key || componentId} ${isVoidDay ? 'void' : ''}"></div>
    `
  }
  return `
    <div class="Day ${props.key || componentId} ${!isVoidDay ? 'date' : ''}" id="${month}-${date}-${year}">
      ${month}/${date}/${year} - ${!!stock?.stock ? `${stock.stock}` : 'lol'}
    </div>
  `
};

export default (props) => render(
  props, 
  props.key || componentId, 
  Day, 
  styles, 
  onLoad,
);