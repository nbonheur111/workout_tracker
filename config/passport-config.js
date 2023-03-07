const User = require('../models/user.js');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')


module.exports = async function(passport) {

    //1. use the local strategy,
    //check email and password

    passport.use(

        new localStrategy({usernameField: "username"}, async(username, password, done) => {
            //check if user with this username exists:

            console.log(" S T R A T E G Y")

            const user = await User.findOne({username: username})
            console.log("got the user ", user);

            if(!user){
                return done(null, false, {message: 'Incorrect email or password.'})
            }
            //if user exist, check password match

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    //return the  user if the password match
                    return done(null, user, {message: "user found"});
                }else {
                    return done(null, false, {message: 'Incorrect email or password.'})
                }
            })

        })
    );

    //2. add seralize function to passport library
    //place user in a session(serializeUser)
    //callback function(cb)

    passport.serializeUser((user, cb) => {
        cb(null, user)
    // 3. add deserialize function to passport library
    // take out of session(deserializeUser)

    passport.deserializeUser(async (id, cb) => {
        return cb(null, await User.findById(id))
    });


    })
}