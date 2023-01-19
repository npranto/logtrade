/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
import DayLabels from './DayLabels';
import DaysGrid from './DaysGrid';

function MonthlyCalendarGrid(props) {
	return (
		<section className="MonthlyCalendarGrid my-2">
			<DayLabels />
			<DaysGrid {...props} />
		</section>
	);
}

export default MonthlyCalendarGrid;
