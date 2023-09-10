import React, { useState, useEffect } from "react";

const Recommendations = ({ workouts }) => {
  const [totalHoursAllTime, setTotalHoursAllTime] = useState(0);
  const [totalHoursYTD, setTotalHoursYTD] = useState(0);
  const [totalHoursThisMonth, setTotalHoursThisMonth] = useState(0);
  const [totalHoursThisWeek, setTotalHoursThisWeek] = useState(0);
  const [totalHoursLastWeek, setTotalHoursLastWeek] = useState(0);
  const [totalHoursThisWeekToDate, setTotalHoursThisWeekToDate] = useState(0);
  const [totalHoursLastWeekSameDay, setTotalHoursLastWeekSameDay] = useState(0);
  const [diffThisWeekToDateLastWeek, setDiffThisWeekToDateLastWeek] = useState(0);

  useEffect(() => {
    //all time
    const totalHours = workouts.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    setTotalHoursAllTime(totalHours);

    //total workout YTD
    const yearStart = new Date(new Date().getFullYear(), 0, 1); //start of current year
    const workoutsYTD = workouts.filter(
      (workout) => new Date(workout.date) >= yearStart
    );
    const totalHoursYTD = workoutsYTD.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    setTotalHoursYTD(totalHoursYTD);

    //This month
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const workoutsThisMonth = workouts.filter(
      (workout) => new Date(workout.date) >= monthStart
    );
    const totalHoursThisMonth = workoutsThisMonth.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    setTotalHoursThisMonth(totalHoursThisMonth);

    //this week
    const weekStart = new Date(
      new Date() - new Date().getDay() * 86400000
    ); //start of current week
    const workoutsThisWeek = workouts.filter(
      (workout) => new Date(workout.date) >= weekStart
    );
    const totalHoursThisWeek = workoutsThisWeek.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    setTotalHoursThisWeek(totalHoursThisWeek);

    //last week
    const lastWeekStart = new Date(weekStart - 7 * 86400000); //previous week start
    const lastWeekEnd = new Date(weekStart - 86400000); //end of previous week
    const workoutsLastWeek = workouts.filter(
      (workout) =>
        new Date(workout.date) >= lastWeekStart &&
        new Date(workout.date) <= lastWeekEnd
    );
    const totalHoursLastWeek = workoutsLastWeek.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    setTotalHoursLastWeek(totalHoursLastWeek);

    //this week to date
      const today = new Date();
      const workoutsThisWeekToDate = workouts.filter(
      (workout) => new Date(workout.date) >= weekStart && new Date(workout.date) <= today
      );
      const totalHoursThisWeekToDate = workoutsThisWeekToDate.reduce(
      (total, workout) => total + workout.duration,
      0
      );

    //last week to date
    const lastWeekStartDate = new Date(weekStart - 7 * 86400000);
    const lastWeekEndDate = new Date(weekStart - 86400000);
    const workoutsLastWeekToDate = workouts.filter(
    (workout) =>
    new Date(workout.date) >= lastWeekStartDate && new Date(workout.date) <= lastWeekEndDate
    );
    const totalHoursLastWeekToDate = workoutsLastWeekToDate.reduce(
    (total, workout) => total + workout.duration,
    0
    );

    // Calculate the difference between this week to date and last week same period
    const diffThisWeekToDateLastWeek = totalHoursThisWeekToDate - totalHoursLastWeekSameDay;
    setDiffThisWeekToDateLastWeek(diffThisWeekToDateLastWeek);

    setTotalHoursThisWeekToDate(totalHoursThisWeekToDate);
    setTotalHoursLastWeekSameDay(totalHoursLastWeekToDate);

    

    }, [workouts]);

return (
    <div>
        <h2>Summary:</h2>
          <p>
          {/* Total hours spent working out all time: {totalHoursAllTime.toFixed(1)/60}{" "}
          hours */}
          </p>
          <p>YTD: {(totalHoursYTD/60).toFixed(1)} hours</p>
           <p>
          This month:{" "}
          {(totalHoursThisMonth /60).toFixed(1)} hours
          </p>
          <p>Last week Total: {(totalHoursLastWeek / 60).toFixed(1)} hours</p>
          <p>This week: {(totalHoursThisWeek / 60).toFixed(1)} hours</p>

          <p>
          This week so far:{" "}
          {(totalHoursThisWeekToDate /60).toFixed(1)} hours
          </p>
          <p>
          Last week same day, you were at:{" "}
          {(totalHoursLastWeekSameDay / 60 ).toFixed(1)} hours
          </p>
          <p>
          {/* Difference between this week up to today and same period last week:{" "} */}
          {/* {diffThisWeekToDateLastWeek.toFixed(2)} hours */}
          </p>
    </div>
);
};

export default Recommendations;