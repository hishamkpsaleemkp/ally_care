import { ServiceCategorySchema } from "../models/index.js";

const createServiceCategory = async (req, res) => {
    const { name, image, description } = req.body;
    try{
        const newServiceCategory = new ServiceCategorySchema({ name, image, description});
        const savedServiceCategory = await newServiceCategory.save();
        res.status(201).json(savedServiceCategory);
    }catch (error){
        res.status(500).json({ message: 'failed to create service category',error});
    }
};

const getAllServiceCategory = async (req,res) => {
    try{
        const serviceCategory = await ServiceCategorySchema.find();
        res.status(200).json(serviceCategory);
    }catch (error){
        res.status(500).json({ message: 'Failed to fetch service category',error });
    }
};

const getServiceCategory = async (req, res) => {
    try{
        const serviceCategory = await ServiceCategorySchema.findById(req.params.id);
        if (!serviceCategory){
            return res.status(404).json({message: 'service category not found!'});
        }
        res.status(200).json(serviceCategory);
    }catch (error){
        res.status(500).json({message: 'failed to fetch service category',error});
    }
};


const updateServiceCategory = async (req,res) => {
    const { name, image, description } = req.body;
    try{
        const updatedServiceCategory = await ServiceCategorySchema.findByIdAndUpdate(
            req.params.id,
            { name, image, description },
            { new: true, runValidators: true }
        );
        if (!updatedServiceCategory) {
            return res.status(404).json({ message: 'service category not found' });
        }
        res.status(200).json(updatedServiceCategory);
    }catch (error){
        res.status(500).json({ message: 'failed to update service category' });
    }
};

const deleteServiceCategory = async (req, res) => {
    try{
        const deletedServiceCategory = await ServiceCategorySchema.findByIdAndDelete(req.params.id);
        if (!deletedServiceCategory) {
            return res.status(404).json({ message: 'Service category not found' });
        }
        res.status(200).json({ message: 'Service category deleted successfully' });
    } catch(error){
        res.status(500).json({ message: 'failed to delete service category' });
    }
};


export {
    createServiceCategory,
    getAllServiceCategory,
    getServiceCategory,
    updateServiceCategory,
    deleteServiceCategory
}