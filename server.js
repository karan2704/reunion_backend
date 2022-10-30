const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

const authorize = require("./middleware/authorize")

const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

URI = process.env.MONGODB_URI

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Database')
})

app.use('/api', authRouter)
app.use('/api', authorize, userRouter)
app.use('/api', authorize, postRouter)

app.listen(PORT, ()=>{
    console.log("Listening on PORT: ", PORT)
})