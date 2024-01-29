const express = require("express");
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

//creating express router
const router = express.Router();



//directing all user api request to userRouter
router.use("/user", userRouter);

//directing all account api request to accountRouter
router.use("/account", accountRouter);



//expoting express router 
module.exports = router;