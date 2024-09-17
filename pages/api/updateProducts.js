// Update Products to database

import Product from "@/Models/Product.js";
import connectDB from "@/Middleware/mongoose.js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let product = await Product.findByIdAndUpdate(req.body[i]._id , req.body[i] )
      await product.save();
    }
    res.status(200).json({ success : "success"});
  } else {
    res.status(400).json({ error: "Error while updating" });
  }
};

export default connectDB(handler);