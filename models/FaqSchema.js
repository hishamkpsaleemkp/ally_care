import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true}
});

const FaqSchema = mongoose.model('FaqSchema',faqSchema);
export default FaqSchema;