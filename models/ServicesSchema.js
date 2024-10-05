import mongoose from "mongoose";
import { ServiceCategorySchema } from "./index.js";

const servicesSchema = new mongoose.Schema({
    category:{ type: mongoose.Schema.Types.ObjectId , ref: ServiceCategorySchema , reuired: true},
    name: {type: String, required: true},
    servicesIncluded : [{type : String}],
    features : [{type: String}],
    duration : {type:Number,required: true}, //in minutes
    price : {type: Number, required: true},
    addOns :[{
        name: {type: String},
        price: {type: Number}
    }]
});

const ServicesSchema = mongoose.model('ServicesSchema',servicesSchema);
export default ServicesSchema;