import React ,{ useState, useEffect }from 'react'
import { logIn } from '../../utilities/user-functions';
import axios from 'axios'

const Login = ({setUser}) => {
  

    const [formState, setFormState] = useState({username: '', password: ''});
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setDisabled( formState.username && formState.password ? false : true);

    }, [formState]) //set disabled anytime formState changes



    useEffect(() => {
        let getSessionInfo = async () => {
          let res = await axios('/session-info')
          console.log(res);
          console.log("success")

          if(res.data.session.passport){
            let user = res.data.session.passport.user;
            console.log("user..", user)
            setUser(user)
          }
        }
        getSessionInfo()
      }, [])



    const handleChange = (event) => {
        let propertyName = event.target.name

        setFormState({
            ...formState, //referencing what was already in the state(diff from class components)
            [propertyName]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
           await logIn(formState);
          let getSessionInfo = async () => {
            let res = await axios('/session-info')
            console.log(res);
            console.log("success")
  
            if(res.data.session.passport){
              let user = res.data.session.passport.user;
              console.log("user..", user)
              setUser(user)
            }
          }
          getSessionInfo()
          // setUser(response.user);
    
        } catch (error) {
          setError(error.message);
        }
      }

   
  return (

    <div>
        <div className='form-container'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label> Username:</label>
                <input type="text" name="username" value={formState.username} onChange={handleChange} required />
                <label> Password:</label>
                <input type="password" name="password" value={formState.password} onChange={handleChange} required />
                <button type='submit' disabled={disabled}>Log In</button>
                
            </form>

        </div>

        <p className='error-message' >&nbsp;{error}</p>

    </div>
  
)

}

export default Login