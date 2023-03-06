import React, { Component } from 'react'
import { signUp } from '../../utilities/user-functions'

export default class SignupForm extends Component {

    state = {

        email: '',
        username: '',
        name: '',
        password: '',
        confirm: '',
        error: ''
    }

    //for the form in return, our value comes from the state and 
    //onChange handler  changes our state. value doesn't change by itself
    //every key press set the state and rerender
    //without the handleChange function, the state will not change and so the value won't change
    //or simply cannot type into the box since state is not changing

    handleChange = (event) => {
        let propertyName = event.target.name

        this.setState({
            [propertyName]: event.target.value,
            error: '' //reset error to nothing
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault(); // do not refresh the page
        console.log("submitting")

        


        //make async call to the server with the data
        //we will make a function in a separte file and import it here
        let data = {...this.state}
        delete data.confirm
        delete data.error //delete both error and confirm as we don't need to send them on backend
        console.log(data)

        let response = await signUp(data);
        console.log(response)


    }

    


  render() {
    const disable = this.state.password !== this.state.confirm;
    //disable the submit button until the two password matches

    return (

        <div>
            <div className='form-container'>
                <form autoComplete='off' onSubmit={this.handleSubmit}>

                    <label> Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <label> Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
                    <label> Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label> Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    <label> Confirm:</label>
                    <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                    <button type='submit' disabled={disable}>SIGN UP</button>

                </form>


            </div>

            <p className='error-message' >&nbsp;{this.state.error}</p>


        </div>
      
    )
  }
}
