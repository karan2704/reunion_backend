const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../models/userSchema")
const authRouter = express.Router()


authRouter.post('/authenticate', async (req, res) => {

    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "2h",
        }
      );
     
      res.status(200).json({
        message: "User authenticated",
        token: token
      });
      
    }else{
      res.status(400).send("Invalid Credentials");
    }
})

module.exports = authRouter;