const { JWT_SECRET } = require("../config.js")
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(411).json({
            message: "authrization Digital signaure token not found ",
            
        })


    }

    const Token = authHeader.split(' ')[1];
    console.log(Token);

    try {
        const decoded = jwt.verify(Token, JWT_SECRET);
        req.userId = decoded.userID;
        console.log(req.userId);
        next();

    } catch (error) {
        res.status(411).json({
            message: "Verification Of Digital Signature NOT FOUND",
            token : Token
        })

    }



};

module.exports = {
    authMiddleware
}