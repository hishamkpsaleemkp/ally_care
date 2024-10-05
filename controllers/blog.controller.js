import { BlogSchema } from "../models/index.js";

const createBlog = async (req, res) => {
    const { title, image, content } = req.body;
     try {
        const newBlog = new BlogSchema({ title, image, content });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
     } catch (error) {
        res.status(500).json({ message: 'failed to create blog', error });
     }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogSchema.find();
        res.status(200).json(blogs); 
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch blog', error });
    }
};


const getBlog = async (req, res) => {
    try {
        const blog = await BlogSchema.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch blog ' });
    }
};


const updateBlog = async (req, res) => {
    const { title, image, content } = req.body;

    try {
        const updatedBlog = await BlogSchema.findByIdAndUpdate(
            req.params.id,
            { title, image, content, updatedAt: Date.now() },
            { new: true, runValidators:true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error){
        res.status(500).json({ message: 'failed to update blog', error });
    }
};


const deleteBlog = async (req, res)=> {
    try {
        const deletedBlog = await BlogSchema.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json({ message: 'blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'failed to delete blog', error });
    }
};

export {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}