import User from "@/Models/User";
import connectDB from "@/Middleware/mongoose.js";

 const handler = async (req, res) => {

    if(req.method === 'POST'){
        console.log(req.body);
        let user = await User.findOne({"email" : req.body.email});
        if(user){
            if(req.body.email == user.email &&  req.body.password == user.password){
                res.status(200).json({ success : "success" });
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
  