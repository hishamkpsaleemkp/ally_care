import mongoose from "mongoose";

const serviceCategorySchema = new mongoose.Schema({
    name: {type:String, required:true },
    image: { type: String, required:true },
    description: { type: String}
});

const ServiceCategorySchema = mongoose.model('ServiceCategorySchema',serviceCategorySchema);
export default ServiceCategorySchema;