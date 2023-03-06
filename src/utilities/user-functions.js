import axios from "axios"


//sign up 
export const signUp = async (formData) => {
    console.log(formData)

    let serverResponse = await axios ({
        method: "POST",
        url: "/users/create_user",
        data: formData

    })
    return serverResponse;
    
}

//login

export const logIn = async (formData) => {

    let serverResponse = await axios ({
        method: "PUT",
        url: "/users/login",
        data: formData

    })
    console.log(serverResponse)
    return serverResponse;
    
}

//get user session
// export const getUserFromSession = async () => {
//     let response = await axios('/session-info')

//     //chck if we have the loggged in user
//     if(response.data.session.passport){
//         let user = response.data.session.passport.user;
//         return user
//     }
//     return false;
// }


//get workout History

export const getWorkoutHistory = async () => {
    try {
        let serverResponse = await axios({
            method: "GET",
            url: "/users/history"
        })
        console.log(serverResponse)
        return serverResponse;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

//add workout
export const addWorkout = async (formData) => {

    let serverResponse = await axios({
        method: "POST",
        url: "/users/create_workout", // route to do signup
        data: formData
    });

return serverResponse;
}

//delete workout

export const deleteWorkout = async (idToDelete) => {
    try {
        let serverResponse = await axios({
            method: "DELETE",
            url: `/users/delete_workout/${idToDelete}`
        });
        return serverResponse.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Workout not found.');
        } else {
            throw error;
        }
    }
};

//update workout

export const  updateWorkout =  async (idToEdit, updatedData) => {

    let serverResponse = await axios ({
        method:"PUT",
        url: `/users/update_workout/${idToEdit}`,
        data: updatedData

    })

}
