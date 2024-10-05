import { ServicesSchema } from "../models/index.js";

const createService = async (req, res) => {
    const { category, name, servicesIncluded, features, duration, price, addOns } = req.body;

    try {
        const newService = new ServicesSchema({ category, name, servicesIncluded, features, duration, price, addOns });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch(error){
        res.status(500).json({ message: 'failed to create service', error });
    }
};


const getAllServices = async (req, res) => {
    try {
        const services = await ServicesSchema.find().populate('category');
        res.status(200).json(services);
    }  catch (error){
        res.status(500).json({ message:'failed to fetch services', error });
    }
};


const getService = async(req, res) => {
    try {
        const service = await ServicesSchema.findById(req.params.id).populate('category');
        if(!service) {
            return res.status(404).json({ message: 'service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch service', error });
    }
};


const getServiceByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const services = await ServicesSchema.find({ category: categoryId }).populate('category');

        if (services.length === 0) {
            return res.status(404).json({ message: 'No service found for this category' });
        }
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch services', error });
    }
};


const updateService = async (req, res) => {
    const { category, name, servicesIncluded, features, duration, price, addOns } = req.body;

    try {
        const updatedService = await ServicesSchema.findByIdAndUpdate(
            req.params.id,
            { category, name, servicesIncluded, features, duration, price, addOns },
            { new: true, runValidators: true }
        );
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'failed to update service ', error });
    }
};


const deleteService = async (req, res) => {
    try {
        const deletedService = await ServicesSchema.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'service not found' });
        }
        res.status(200).json({ message: 'service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'failed to delete service', error });
    }
};

export {
    createService,
    getAllServices,
    getService,
    getServiceByCategory,
    updateService,
    deleteService
}