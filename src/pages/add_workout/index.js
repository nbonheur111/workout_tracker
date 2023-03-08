import React, { useState, useHistory } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addWorkout } from '../../utilities/user-functions.js';
import "./index.css"

const CreateWorkout = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    workout: '',
    duration: '',
    description: '',
    date: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // do not refresh the page
  //   console.log("submitting..")

  //   let data = {...state};
  //   delete data.confirm;

  //   let response = await addWorkout(data)
  //   console.log(response);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault(); // do not refresh the page
    console.log("submitting..")
  
    let data = {...state};
    delete data.confirm;
  
    try {
      let response = await addWorkout(data);
      console.log(response);
      setSuccessMessage('Exercise log created successfully.');
      setErrorMessage('');
      setTimeout(() => {
        navigate('users/workout');
      }, 2000); // redirect user to main page after 2 seconds
    } catch (error) {
      console.error(error);
      setErrorMessage('Error creating exercise log. Please try again.');
      setSuccessMessage('');
    }
  }
  

  const onChangeDate = (date) => {
    setState(prevState => ({
      ...prevState,
      date: date
    }));
  }

  const disable = state.password !== state.confirm;

  return (
    <div className="create-workout">
      <h2>Log an Exercise  </h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form autoComplete='off' onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="workout">Workout: <br/></label>
          <select 
            name='workout'
            required
            value={state.workout}
            onChange={handleChange}
            id="workout"
          >
            <option value="">Select a workout</option>
            <option>Walk </option>
            <option>Run </option>
            <option>Cycle </option>
            <option>Hiking </option>
            <option>Swim </option>
            <option>Yoga </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration: <br/> </label>
          <input  
            type="number" 
            name='duration'
            value={state.duration} 
            onChange={handleChange}  
            required
            id="duration"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: <br/>  </label> <br/>
          <textarea   
            rows="4" 
            cols="50" 
            type="text" 
            name='description' 
            value={state.description} 
            onChange={handleChange}
            required
            id="description"
          />  
        </div>
        <div className="form-group">
          <label  htmlFor="date">Date: <br/> </label>
          <div className='date-piker'>
            <DatePicker
              selected={state.date}
              onChange={onChangeDate} 
              id="date"
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={disable}>Create Exercise Log</button>
        </div>
        
      </form>
      <div className='push'></div>
    </div>
  );
};

export default CreateWorkout;
