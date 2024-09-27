const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

blogSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});


const BlogSchema = mongoose.model('BlogSchema', blogSchema);
module.exports = BlogSchema;