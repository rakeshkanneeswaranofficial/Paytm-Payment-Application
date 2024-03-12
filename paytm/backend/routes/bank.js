// zod validation schema 

const { User, Account } = require('../db/usersDB');






const express = require("express");
const router = express.Router();






//------------------------------------------------------------------------------------



router.get("/bulk", async (req, res) => {
    // Extract the filter parameter from the query string, default to an empty string
    const filter = req.query.filter || "";

    // Use Mongoose to find users based on the provided filter
    const users = await User.find();

    const account = await Account.find();

    // Map the user data to a simplified format and send as JSON response
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })),

        account : account
    });
});



module.exports = router;
