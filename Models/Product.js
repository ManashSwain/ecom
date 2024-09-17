const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {type : String , required : true},
    slug : {type : String , required : true , unique : true},
    description : {type : String , required : true},
    image : {type : String , required : true},
    category : {type : String , required : true},
    size : {type : String},
    color : {type : String , required : true},
    price : {type : Number , required : true},
    availableQuantity : {type : Number , required : true},
},{timestamps:true});

// To avoid recreating of models 
mongoose.models = {}

export default mongoose.model('Product' , ProductSchema);