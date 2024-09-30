// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "@/Models/User";
import connectDB from "@/Middleware/mongoose.js";
var CryptoJS = require('crypto-js');


 const handler = async (req, res) => {

    if(req.method === 'POST'){
        console.log(req.body);
        const {name , email , password} = req.body
        let user = new User({name , email , password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() });
         await user.save();
        res.status(200).json({ success : "success" });
    }
    else {
        res.status(400).json({ error : "The method is invalid" });
    }
  }

  export default connectDB(handler);
  