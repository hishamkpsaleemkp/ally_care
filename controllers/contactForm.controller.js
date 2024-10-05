import { ContactFormSchema } from "../models/index.js";

const createContact = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new ContactFormSchema({ name, email, message });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact); 
    } catch (error) {
        res.status(500).json({ message: 'failed to save contact form ', error });
    }
};


const getAllContacts = async (req, res) => {

    try {
        const contactForms = await ContactFormSchema.find();
        res.status(200).json(contactForms);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch contact forms ', error });
    }
};


export {
    createContact,
    getAllContacts
}