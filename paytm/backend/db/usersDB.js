const mongoose = require('mongoose');

const dataBaseURL = "mongodb://localhost:27017/PaytmUsers";
mongoose.connect(dataBaseURL);

//defining Schema 

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30

    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },


    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,


    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50

    }

});

const accountSchemankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model("Account", accountSchemankSchema);

module.exports = {
    User, Account
};






