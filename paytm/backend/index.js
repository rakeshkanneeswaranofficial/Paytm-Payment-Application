// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index.js");
const cors = require('cors')


const PORT = 3000;
const app = express();



// To prevent Cross-Origin Resource Sharing Error 
app.use(cors());

//To parse and validate request body 
app.use(express.json());

// to divert the request the router/index file 
app.use("/api/v1", rootRouter);



app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
