const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    category:{ type: Schema.Types.ObjectId , ref: 'ServiceCategory', reuired: true},
    package: [{
        name: {type: String, required: true},
        servicesIncluded : [{type : String}],
        features : [{type: String}],
        duration : {type:Number,required: true}, //in minutes
        price : {type: Number, required: true}
    }],
    addOns :[{
        name: {type: String},
        price: {type: Number}
    }]
});

const Services = mongoose.model('Services',servicesSchema);
module.exports = Services;