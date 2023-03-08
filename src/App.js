import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/auth';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateWorkout from './pages/add_workout';
import WorkoutHistory from './pages/workout_history';
import EditWorkout from './pages/edit'
import Navbar from './components/nav';
import Footer from './components/footer'
import axios from 'axios'

function App() {

  const [ user, setUser ] = useState(null);

   const handleLogout = async() => {
    let response =  await axios({
      method: "PUT",
      url: '/logout'

    })
    setUser(null);
  };

  useEffect(() => {
    const getSessionInfo = async () => {
      let res = await axios('/session-info')
      console.log(res);
      console.log("success")

      if(res.data.session.passport){
        let user = res.data.session.passport.user;
        console.log("user..", user)
        setUser(user)
      }
    }
    getSessionInfo();

  }, [])


  const returnPage = () => {

    return (
      <>
   
    
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
        <AuthPage setUser={setUser} />

      }
     </>
    )

  }


  return (
    <div className="App">

      {/*if user does not exist, take them to auth page, if they exist show them the pages */}
      {returnPage()}
     
      
    </div>
  );
}

export default App;
