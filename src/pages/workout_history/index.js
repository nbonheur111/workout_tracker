import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getWorkoutHistory } from '../../utilities/user-functions';
import Highlights from './highlights';
import './index.css';
import Recommendations from './recommendation';

const WorkoutHistory = () => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [visibleWorkouts, setVisibleWorkouts] = useState(4);
  const [startIndex, setStartIndex] = useState(0); 
  //keep track of starting index.


  //fetch workout history data from the server and update the workouts state 
  //variable when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const serverResponse = await getWorkoutHistory();
      setWorkouts(serverResponse.data);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setStartIndex(startIndex + 4);
    setVisibleWorkouts(visibleWorkouts + 4);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 4);
    setVisibleWorkouts(visibleWorkouts - 4);
  };

//function to display workouts to the user

const handleCliclickStartWorkout = ()=> {
  navigate('/workout/create')

}
  const displayWorkouts = () => {

    console.log(workouts.length)
    if(workouts.length == 0) {
      return(
        <div>
        <p> 
        What seems impossible today will one day become your warm-up..
        </p>
        <h3 style={{color:"blue"}}>Ready to start working out?</h3>
        <button>Let's Go</button>
      </div>

      )
     
      
    } else{
      const sortedWorkouts = workouts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ); //sot the array to display the most rect workouts at the top
      const visibleWorkoutsArray = sortedWorkouts.slice(startIndex, visibleWorkouts);

      return visibleWorkoutsArray.map((workout) => (
        <div key={workout._id} className="workout-card">
          <div className="workout-header">
            <div className="workout-date">
              {new Date(workout.date).toLocaleDateString()}
            </div>
            <div className="workout-name">{workout.workout}</div>
          </div>
          <div className="workout-details">
            <div className="workout-duration">{workout.duration} minutes</div>
            <div className="workout-description">{workout.description}</div>
          </div>
        </div>
      ));
    };
  

    }
   
  return (
    <div className="workout-container">
      <div className="workout-history">
        <h2>Workout History</h2>
        {displayWorkouts()}
        <div className="pagination">
          {startIndex > 0 && (
            <button className="prev-btn" onClick={handlePrev}>
              Prev
            </button>
          )}
          {visibleWorkouts < workouts.length && (
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
      <div className="right-side">
        <Recommendations  workouts={workouts}/>
        <Highlights />
      </div>
      <div className='push'></div>
    </div>
  );
};

export default WorkoutHistory;
