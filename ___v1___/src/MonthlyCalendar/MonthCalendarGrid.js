import DayLabels from "./DayLabels";
import DaysGrid from "./DaysGrid";

const MonthlyCalendarGrid = (props) => {
  return (
    <section className="MonthlyCalendarGrid my-2">
      <DayLabels />
      <DaysGrid {...props} />
    </section>
  )
}

export default MonthlyCalendarGrid;