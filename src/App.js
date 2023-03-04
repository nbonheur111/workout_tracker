import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/auth';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateWorkout from './pages/add_workout';
import WorkoutHistory from './pages/workout_history';
import EditWorkout from './pages/edit'
import Navbar from './components/nav';
import Playlist from './pages/playlist';
import Footer from './components/footer'

function App() {

  const [ user, setUser ] = useState(null);

   const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">

      {/*if user does not exist, take them to auth page, if they exist show them the pages */}
     
      { user?

      <div>
        <Navbar user={user} onLogout={handleLogout}/>
          <Routes>
            <Route  path='/workout' element={<WorkoutHistory />}/>
            <Route  path='/workout/create' element={<CreateWorkout />}/>
            <Route  path='/workout/edit' element={<EditWorkout />}/>
            <Route path='/' element={<WorkoutHistory />} /> 
            <Route path='/*' element={<Navigate to="/workout" />} /> 
            {/* catch all route */}
        </Routes>
      <Footer />
      </div>

      :
      <AuthPage setUser={setUser}/>

      }
    </div>
  );
}

export default App;
