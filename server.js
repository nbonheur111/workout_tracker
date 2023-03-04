const express = require('express')
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/database'); //import connection string and connect to DB

const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config.js')

const User = require('./models/user.js');
const Workout = require('./models/workout.js')

const app = express();

app.use(cors({
    origin: "*"
}));


app.use(logger('dev'))

app.use(express.json())

initializePassport(
    passport,
    async username => {
        let user = User.findOne({username: username})
        return user;
    },
    async id => {
        let user = User.findById(id);
        return user;
    },
);

app.use(session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000 }
}))

app.use(express.static(path.join(__dirname, 'build')));

app.get('/test_route', (req, res) => {
    res.send("Good route")
})

//------------------ROUTES-----------------------

//user is authenticated and is in session, what is next?
//once user is in session, we can create a route to get session info(cookie, passport property..)



app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    });
});


//delete workout


app.delete("/users/delete_workout/:workoutId", async(req, res) => {
    
    let id = req.params.workoutId
    console.log(id)

    let response = await Workout.findByIdAndDelete(id);
    console.log(response);
    res.send({data: `This workout has been deleted from the database..`})
})

//update workout
app.put('/users/update_workout/:workoutId',async(req, res) => {
    let id = req.params.workoutId;
    

    let newValues={
        username: req.body.username,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    }
    let response = await Workout.findByIdAndUpdate(id, newValues, {new:true});
    console.log(response);
    res.send(response)
});

//update users

app.put('/users/update_user/:userId',async(req, res) => {

    let id = req.params.userId // to test the route with thundercloud. id will be req.body.id from frontend

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newValues={
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword

    }
    let response = await User.findByIdAndUpdate(id, newValues, {new:true});
    console.log(response);
    res.send(response)
})

//create user route
app.post('/users/create_user', async (req, res) => {
    console.log(req.body)

    //hash password
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)

    let userFromCollection = await User.create({
        email: req.body.email,
        username: req.body.username,
        fullName: req.body.name,
        password: req.body.hashedPassword
    })

    res.json("user created")

})

//login route
app.put('/users/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate("local", (err, user, message) => {
        console.log(message)

        if(err) throw err;
        if(!user){
            res.json({
                message: "login failed",
                user: false
            })
        }else{
            req.login(user, err => {
                if(err) throw err;
                res.json({
                    message: "successfully authenticated"
                });
            })
        }
    })(req, res, next);
})





//route to get workout
app.get('/users/history', async(req, res) => {
    console.log(req.body);

    try {
        const workout = await Workout.find({});
        // console.log(workout);
        res.json(workout)
    
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
        
    }
});

//route to create a workout

app.post('/users/create_workout', async(req, res) => {

    console.log(req.body)

    try {
        let workoutFromCollection = await Workout.create({
            username: req.body.username,
            workout:req.body.workout,
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date
        })

        console.log(workoutFromCollection);
        res.json('Workout created successfully!')
        
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
        
    }
});





//cath all get route. Has to be the last or it will cath other routes

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

});
app.listen(5000, () => {
    console.log(`Server is Listening on 5000...`)
})