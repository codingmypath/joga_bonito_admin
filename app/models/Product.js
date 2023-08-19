import mongoose, { model, Schema, models } from "mongoose";
// import { model, Schema} from "mongoose";
// import { mongoose } from "mongoose";


//This one is the one that had worked before mongodb section
// const ProductSchema = new Schema({
//     title:{type:String, required:true},
//     description: String,
//     price:{type: Number, required: true},
// });

// export const Product = model('Product', ProductSchema);



//from comments
// import { Schema, model, models } from "mongoose"
// const { Schema, default: mongoose } = require("mongoose"); 

// const ProductSchema = new Schema({

//     title: {type: String, required: true},
//     description: String,
//     price: {type: Number, required: true},

// })


// export default mongoose.models.Product || mongoose.model("Product", ProductSchema);



//THE LAST ONE THAT I HAD WORKING BEFORE I RUINED IT
const ProductSchema = new Schema({
    title:{type:String, required:true},
    description: String,
    price:{type: Number, required: true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
}, {
    timestamps: true,
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);



// const ProductSchema = new Schema({
//     title:{type:String, required:true},
//     description: String,
//     price:{type: Number, required: true},
// });

// export const Product = mongoose.model.Product || mongoose.model('Product', ProductSchema);



// const ProductSchema = new Schema({
//     title:{type:String, required:true},
//     description: String,
//     price:{type: Number, required: true},
// });

// const Product = mongoose.model.Product || mongoose.model('Product', ProductSchema);

// export default Product
