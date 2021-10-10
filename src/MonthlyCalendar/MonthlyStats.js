const MonthlyStats = props => {
  return (
    <div className="MonthlyStats monthly-stats flex">
      <p className="gains my-1">
        <sub className="text-gray-400">Gains: </sub> 
        <span className="text-green-900 title-font sm:text-4xl text-3xl font-medium"> $254 </span>
      </p>
      <p className="losses text-red-900 my-1 ml-2">
        <sub className="text-gray-400">Losses: </sub> 
        <span className="text-red-900 title-font sm:text-4xl text-3xl font-medium"> $100 </span>
      </p>
      <p className="p-l text-gray-900 my-1 ml-2">
        <sub className="text-gray-400">P/L: </sub> 
        <span className="text-gray-500 title-font sm:text-4xl text-3xl font-medium"> $154 </span> 
      </p>
    </div>
  )
}

export default MonthlyStats;