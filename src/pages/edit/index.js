import React, { useState, useEffect } from 'react';
import { getWorkoutHistory, deleteWorkout, updateWorkout } from '../../utilities/user-functions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const EditWorkout = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [workout, setWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    let fetchData = async () => {
      const serverResponse = await getWorkoutHistory();
      setWorkoutData(serverResponse.data);
      console.log(serverResponse);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      await deleteWorkout(id);
      setWorkoutData(workoutData.filter((workout) => workout._id !== id));
    }
  };

  const handleEdit = (id) => {
    const workoutToEdit = workoutData.find((workout) => workout._id === id);
    setEditingId(id);
    setWorkout(workoutToEdit.workout);
    setDuration(workoutToEdit.duration);
    setDescription(workoutToEdit.description);
    setDate(new Date(workoutToEdit.date));
  };

  const handleUpdate = async (id) => {
    await updateWorkout(id, { workout, duration, description, date });
    setEditingId(null);
    const serverResponse = await getWorkoutHistory();
    setWorkoutData(serverResponse.data);
  };

  const handleCancel = () => {
    setEditingId(null);
    setWorkout('');
    setDuration('');
    setDescription('');
    setDate('');
  }

  return (
    <div className='history-container'>
      <h2>Choose a workout to edit</h2>
      {editingId ? (
        <form>
          <label>Workout</label>
          <select value={workout} onChange={(e) => setWorkout(e.target.value)}>
            <option value="">Select a workout</option>
            <option value="Walk">Walk</option>
            <option value="Run">Run</option>
            <option value="Cycle">Cycle</option>
            <option value="Hiking">Hiking</option>
            <option value="Swim">Swim</option>
            <option value="Yoga">Yoga</option>
          </select>

          <label>Duration (mins)</label>
          <input type='text' value={duration} onChange={(e) => setDuration(e.target.value)} />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Date</label>
          <br />
          <DatePicker selected={date} onChange={(date) => setDate(date)} />


          <button onClick={() => handleUpdate(editingId)}>Update</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Workout</th>
              <th>Duration (mins)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workoutData.map((workout) => (
              <tr key={workout._id}>
                <td>{new Date(workout.date).toLocaleDateString()}</td>
                <td>{workout.workout}</td>
                <td>{workout.duration}</td>
                <td>{workout.description}</td>
                <td>
                  <button className='delete-btn' onClick={() => handleDelete(workout._id)}>Delete</button>
                  <button className='delete-btn' onClick={() => handleEdit(workout._id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EditWorkout;
