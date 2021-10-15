import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const MonthNavigator = (props = {}) => {
  const { 
    prevMonth, 
    nextMonth, 
    onClickOnPrevMonth,
    onClickOnNextMonth,
  } = props;
  
  if (!prevMonth || !nextMonth) return null;

  return (
    <div className="MonthNavigator flex items-center">
      <button type="button" className="inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-small text-white bg-indigo-600 hover:bg-indigo-700" onClick={onClickOnPrevMonth}>
        <AiOutlineArrowLeft className="mr-1" /> {prevMonth}
      </button>

      <button type="button" className="inline-flex items-center justify-center px-2 py-1 ml-1 border border-transparent text-base font-small text-white bg-indigo-600 hover:bg-indigo-700" onClick={onClickOnNextMonth}>
        {nextMonth} <AiOutlineArrowRight className="ml-1" />
      </button>
    </div>
  );
};

export default MonthNavigator;