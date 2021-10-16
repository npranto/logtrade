const DayLabels = props => {
  return (
    <div className="DayLabels day-labels text-xs md:text-sm">
      <p className="day">
        <span className="long hidden sm:block">Sunday</span> 
        <span className="long sm:hidden block">Su</span>
      </p>
      <p className="day">
        <span className="long hidden sm:block">Monday</span> 
        <span className="long sm:hidden block">Mo</span>
      </p>
      <p className="day">
        <span className="long hidden sm:block">Tuesday</span> 
        <span className="long sm:hidden block">Tu</span>
      </p>
      <p className="day">
        <span className="long hidden sm:block">Wednesday</span> 
        <span className="long sm:hidden block">We</span>
      </p>
      <p className="day">
        <span className="long hidden sm:block">Thursday</span> 
        <span className="long sm:hidden block">Th</span>
      </p>
      <p className="day">
        <span className="long hidden sm:block">Friday</span> 
        <span className="long sm:hidden block">Fr</span>
      </p>
      <p className="day">
        <span className="long hidden sm:block">Saturday</span> 
        <span className="long sm:hidden block">Sa</span>
      </p>
    </div>
  )
}

export default DayLabels;