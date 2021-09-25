import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
// import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
   
}

const styles = (props) => `
  .${props.key || componentId} {
    border: 1px solid lightgrey; 
  }
  .${props.key || componentId}.date {
    
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
    <div class="Day ${props.key || componentId} ${!isVoidDay ? 'date' : ''}">
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