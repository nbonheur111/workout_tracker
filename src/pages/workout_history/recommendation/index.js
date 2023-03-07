import React from 'react';

const Recommendations = ({ workouts }) => {
  console.log(workouts)

  //all time
  const totalHoursAllTime = workouts.reduce((total, workout) =>{
    return total + workout.duration;
  }, 0 );

  //total wokout YTD
  const yearStart = new Date(new Date.getFullYear(), 0, 1) //start of current year
  const workoutsYTD = workouts.filter((workout) =>new Date(workout.date) >= yearStart);
  const totaHourslYTD = workoutsYTD.reduce((total, workout) => total + workout.duration, 0);

  //This month
  const monthStart = new Date( new Date().getFullYear(), new Date.getMonth(), 1)
  const workoutsThisMonth = workouts.filter((workout) => new Date(workout.date) >= monthStart);
  const totalHoursThisMOnth = workoutsThisMonth.reduce((total, workout) => total + workout.duration, 0)

  //this week
  const weekStart = new Date(new Date() - (new Date().getDay() * 86400000) ); //start of current week
  //86,400,000 is miliseconds in  24hrs, while new Date().getDay() will return a day as an index

    //   const today = new Date();
    // const dayOfWeek = today.getDay();
    // const daysSinceMonday = (dayOfWeek + 6) % 7; 
    // const monday = new Date(today);
    // monday.setDate(today.getDate() - daysSinceMonday);
    // const weekStart = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());

    const workoutsThisWeek = workouts.filter((workout) => new Date(workout.date) >= weekStart);
   const totalHoursThisWeek =  workoutsThisWeek.reduce((total, workout) =>  total + workout.duration, 0)

    //last week
    const lastWeekStart = new Date(weekStart - 7*86400000) //previous week start
    const lastWeekEnd = new Date(weekStart - 86400000)//end of previous week
    const workoutsLastWeek = workouts.filter((workout) => new Date(workout.date) >= lastWeekStart && new Date(workout.date) <= lastWeekEnd)
    const totalHoursLastWeek= workoutsLastWeek.reduce((total, workout) => total + workout.duration, 0);

    //week before last
    const weekBeforeStart = new Date(lastWeekStart - 7*86400000) //start of week before last
    const weekBeforeEnd = new Date(lastWeekStart - 86400000)//end of week before last
    const workoutsWeekBefore = workouts.filter((workout) => new Date(workout.date) >= weekBeforeStart && new Date(workout.date) <= weekBeforeEnd)
    const totalHoursWeekBefore = workoutsWeekBefore.reduce((total, workout) => total + workout.duration, 0);

    // Compare this week to last week
    const weekStartDate = new Date(new Date() - new Date().getDay() * 86400000);
    const lastWeekStartDate = new Date(weekStartDate - 7 * 86400000); // start of previous week
    const lastWeekEndDate = new Date(weekStartDate - 1 * 86400000); // end of previous week
    const weekToDate = totalHoursThisWeek;
    const lastWeekSameDays = workoutsLastWeek.filter(
      (workout) => new Date(workout.date) >= weekStartDate
    );
    const lastWeekSameDaysTotal = lastWeekSameDays.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    const weekComparison = (weekToDate / lastWeekSameDaysTotal ) * 100





  return (
    <div className="recommendations">
      <h2>Recommendations</h2>
      <ul>
        <li>Recommendation 1 coming soon</li>
        <li>Recommendation 2 coming soon</li>
        <li>Recommendation 3 coming soon</li>
      </ul>
    </div>
  );
};

export default Recommendations;
