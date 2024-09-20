import User from "@/Models/User";
import connectDB from "@/Middleware/mongoose.js";
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');

 const handler = async (req, res) => {

    if(req.method === 'POST'){
        console.log(req.body);
        let user = await User.findOne({"email" : req.body.email});
        var bytes  = CryptoJS.AES.decrypt(user.password , 'secret123');
        var decryptedpass = bytes.toString(CryptoJS.enc.Utf8);
        if(user){
            console.log(token)
            if(req.body.email == user.email &&  req.body.password == decryptedpass){
                var token = jwt.sign({ success : true ,name : user.name , email : user.email,}, 'jwtsecret',{ expiresIn: '1h' });
                res.status(200).json({success : true , token});
            }
            else {
                res.status(400).json({ error: "Invalid credentials" });
            }
            
        }
        else {
            res.status(400).json({ error : "User doesnt exist"});
        }
        
    }
    else {
        res.status(400).json({ error : "The method is invalid" });
    }
  }

  export default connectDB(handler);
  