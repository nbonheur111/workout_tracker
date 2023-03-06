import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addWorkout } from '../../utilities/user-functions.js';
import "./index.css"

const CreateWorkout = () => {
  const [state, setState] = useState({
    username: '',
    workout: '',
    duration: '',
    description: '',
    date: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // do not refresh the page
    console.log("submitting..")

    let data = {...state};
    delete data.confirm;

    let response = await addWorkout(data)
    console.log(response);
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
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: <br/> </label>
          <input 
            type="text" 
            name='username'
            value={state.username} 
            onChange={handleChange} 
            required 
            id="username"
          />
        </div>
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
          <div className='date'>
            <DatePicker
              selected={state.date}
              onChange={onChangeDate} 
              id="date"
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn-primary" disabled={disable}>Create Exercise Log</button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkout;