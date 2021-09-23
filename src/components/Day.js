import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
// import MonthlyCalendar from "./MonthlyCalendar";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
   
}

const styles = () => `
  .${componentId} {
    border: 1px solid lightgrey; 
  }
  .${componentId}.date {
    
    border-bottom-right-radius: 5px;
    background: maroon; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.75rem;
  }
  .${componentId}.void {
    width: 100%;
    height: 100%;
    background: lightgrey;
    cursor: not-allowed;
  }
`;

const Day = (props = {}) => {
  const { isVoidDay, date } = props;

  if (isVoidDay) {
    return `
      <div class="Day ${componentId} ${isVoidDay ? 'void' : ''}"></div>
    `
  }
  return `
    <div class="Day ${componentId} ${!isVoidDay ? 'date' : ''}">
      Day - ${date}
    </div>
  `
};

export default (props) => render(
  props, 
  componentId, 
  Day, 
  styles, 
  onLoad,
);