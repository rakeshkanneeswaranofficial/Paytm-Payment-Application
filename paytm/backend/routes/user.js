// zod validation schema 
const zod = require('zod');
const { User, Account } = require('../db/usersDB');
const { authMiddleware } = require("./authMiddleware.js");

//JWT acesses
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');

// Create Express Router 
const express = require("express");
const router = express.Router();


//------------------------------------------------------------------------------------


// Defining Zod Schemas

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()

})

//------------------------------------------------------------------------------------
//API END POINTS FOR USER ROUTE 

router.post("/signup", async function (req, res) {
    const { success } = signupBody.safeParse(req.body);

    //Check wheather the request body is valid
    if (!success) {
        res.status(411).json(
            {
                message: "username already taken / Incorrect input"
            }
        )
    }

    else {

        //checking whether username is already present 
        const existingUser = await User.findOne(
            {
                username: req.body.username
            }
        )

        if (existingUser) {
            res.status(411).json({
                message: "username already taken"
            })
        }

        else {
            const user = await User.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            })

            const userID = user._id;

            await Account.create({
                userId: userID,
                balance: 1 + Math.random() * 10000
            })



            const token = jwt.sign({ userID }, JWT_SECRET);

            res.status(200).json({
                message: "user created sucessfuly ",
                token: token
            })
        }
    }

})

router.post("/signin", async function (req, res) {

    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            messsage: "worng inputs OR username or password missing"
        })
    }

    else {

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        if (user) {
            const token = jwt.sign(
                {
                    userID: user._id
                }
                , JWT_SECRET)

            res.status(200).json({
                message: "signin successful",
                token: token
            })
        }

        else {
            res.status(411).json({
                message: "User Does Note Exist! please create a new account"
            })
        }
    }
})


router.put("/", authMiddleware, async function (req, res) {


    //checking weather all inputs are proper as per the zod Object 

    const success = updateBody.safeParse({
        password: req.password,
        firstName: req.firstName,
        lastName: req.lastName
    })

    // if no
    if (!success) {

        res.status(411).json({
            message: "Improper Inputs please give proper password , firstName , lastName"
        })

    }

    // if yes then 

    await User.updateOne({
        _id: req.userId
    }, req.body)


    res.status(200).json({
        message: "Update Sucessfully",
        id: req.userId,
        data: req.body

    })

})



router.get("/bulk", async (req, res) => {
    // Extract the filter parameter from the query string, default to an empty string
    const filter = req.query.filter || "";

    // Use Mongoose to find users based on the provided filter
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    });

    // Map the user data to a simplified format and send as JSON response
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});



module.exports = router;
