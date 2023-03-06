const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    name:{
        type:String,
        required: true

    },
    password: {
        type: String,
        minLength: 2,
        required: true
    }

},
{
    timestamps: true
});

const User = mongoose.model('users', userSchema);
module.exports = User;