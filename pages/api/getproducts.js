// Get All Products from database 

import Product from "@/Models/Product.js";
import connectDB from "@/Middleware/mongoose.js";

const handler = async (req,res)=>{
    let products =  await Product.find();
    res.status(200).json({ products });
}

export default connectDB(handler)

  