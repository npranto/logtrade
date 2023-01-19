/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
function MonthlyStats(props) {
	const { gains, losses, profit } = props;
	const isTotalProfitNegative = profit.includes('-');

	if (!gains || !losses || !profit) return null;

	return (
		<div className="MonthlyStats monthly-stats flex flex-grow justify-end">
			<p className="gains my-1">
				<sub className="text-gray-400">Gains: </sub>
				<span className="text-green-900 title-font sm:text-2xl text-xl font-medium">
					{' '}
					${gains}
				</span>
			</p>
			<p className="losses text-red-900 my-1 ml-2">
				<sub className="text-gray-400">Losses: </sub>
				<span className="text-red-900 title-font sm:text-2xl text-xl font-medium">
					{' '}
					${losses}
				</span>
			</p>
			<p className="p-l text-gray-900 my-1 ml-2">
				<sub className="text-gray-400">P/L: </sub>
				<span
					className={`${
						isTotalProfitNegative ? 'text-red-900' : 'text-green-900'
					} text-gray-500 title-font sm:text-2xl text-xl font-medium`}
				>
					{' '}
					${profit}
				</span>
			</p>
		</div>
	);
}

export default MonthlyStats;
