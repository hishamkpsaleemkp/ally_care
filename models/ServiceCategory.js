const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
    name: {type:String, required:true,},
    image: { type: String, required:true},
    description: { type: String}
});

const ServiceCategory = mongoose.model('serviceCategory',serviceCategorySchema);
module.exports = ServiceCategory;