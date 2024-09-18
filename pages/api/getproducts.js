// Get All Products from database 

import Product from "@/Models/Product.js";
import connectDB from "@/Middleware/mongoose.js";

const handler = async (req,res)=>{
    let products =  await Product.find();
     let tshirt = {};
     for(let item of products){
        if(item.title in tshirt){
          if(!tshirt[item.title].color.includes(item.color) && item.availableQuantity > 0 ){
             tshirt[item.title].color.push(item.color);
          }
          if(!tshirt[item.title].size.includes(item.size) && item.availableQuantity > 0){
            tshirt[item.title].size.push(item.size);
          }
        }
        else {
          tshirt[item.title] = JSON.parse(JSON.stringify(item));
          if(item.availableQuantity > 0){
             tshirt[item.title].color = [item.color];
             tshirt[item.title].size = [item.size];
          }
        }
     }
    res.status(200).json({ tshirt });
}

export default connectDB(handler)

  