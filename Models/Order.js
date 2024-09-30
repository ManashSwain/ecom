const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  email: {type : String , required : true},
  products : [{
    productId : {type : String , required : true},
    quantity : {type : Number , required : true , default : 1}
  }],
  address : {type : String, required : true},
  amount : {type : Number , required : true},
  status : {type : String , default : 'pending' , required : true},
},{timestamps : true});

// To avoid recreating of models 
 export default mongoose.models.Order || mongoose.model('Order' , OrderSchema);