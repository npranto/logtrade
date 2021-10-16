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
    <div className="MonthNavigator flex items-center gap-1">
      <button type="button" className="inline-flex items-center justify-center px-2 py-1 text-base font-small text-black hover:bg-black hover:text-white border border-black rounded-full w-16" onClick={onClickOnPrevMonth}>
        <AiOutlineArrowLeft className="mr-1" size="12px" /> {prevMonth}
      </button>
      <button type="button" className="inline-flex items-center justify-center px-2 py-1 border border-black text-base font-small text-black hover:bg-black hover:text-white rounded-full w-16" onClick={onClickOnNextMonth}>
        {nextMonth} <AiOutlineArrowRight className="ml-1" size="12px" />
      </button>
    </div>
  );
};

export default MonthNavigator;