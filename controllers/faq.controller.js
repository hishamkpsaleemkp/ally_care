import { FaqSchema } from "../models/index.js";


const createFaq = async (req, res) => {
    const { question, answer } = req.body;
    try {
        const newFaq = new FaqSchema({ question, answer });
        const savedFaq = await newFaq.save();
        res.status(201).json(savedFaq);
    } catch (error) {
        res.status(500).json({ message: 'failed to save new faq ', error });
    }
};


const getAllFaqs = async (req, res) => {
    try {
        const faqs = await FaqSchema.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch faqs ', error });
    }
};



const getFaq = async(req, res) => {
    try {
        const getFaqs = await FaqSchema.findById(req.params.id);
        
        if (!getFaqs) {
            res.status(404).json({ message: 'faq not found' });
        }
        res.status(200).json(getFaqs);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch faqs ', error });
    }
};


const updateFaq = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const updatedFaq = await FaqSchema.findByIdAndUpdate(
            req.params.id,
            { question, answer },
            { new : true, runValidators : true }
        );

        if (!updatedFaq) {
            res.status(404).json({ message: 'faq not found ' });
        }

        res.status(200).json(updatedFaq);
    } catch (error){
        res.status(500).json({ message: 'failed to update faq', error });
    }
};



const deleteFaq = async (req, res) => {
    try {
        const deletedFaq = await FaqSchema.findByIdAndDelete(req.params.id);

        if (!deletedFaq) {
            res.status(404).json({ message: 'faq not found ' });
        }

        res.status(200).json(deletedFaq);
    } catch (error) {
        res.status(500).json({ message: 'failed to delete faq ', error });
    }
};



export {
    createFaq,
    getAllFaqs,
    getFaq,
    updateFaq,
    deleteFaq
}
