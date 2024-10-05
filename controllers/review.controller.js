import { ReviewSchema } from "../models/index.js";


const createReview = async (req, res) => {
    const { user, booking, rating, review } = req.body;
  
    try {
      const newReview = new ReviewSchema({
        user,
        booking,
        rating,
        review
      });
  
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create review', error });
    }
};


const getAllReviews = async (req, res) => {
    try {
      const reviews = await ReviewSchema.find().populate('user').populate('booking');
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};



const getReviewsByUser = async (req, res) => {
    try {
      const reviews = await ReviewSchema.find({ user: req.params.userId }).populate('booking');
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};


const getReviewsByService = async (req, res) => {
    try {
        const serviceId = req.params.serviceId;

        const reviews = await ReviewSchema.find()
        .populate({
            path: 'booking',
            match: { service : serviceId },
            populate: { path : service }
        }).populate('user');

        const filteredReviews = reviews.filter(review => review.booking !== null );

        res.status(200).json(filteredReviews);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch reviews', error });
    }
};


const updateReview = async (req, res) => {
    const { rating, review } = req.body;
  
    try {
      const updatedReview = await ReviewSchema.findByIdAndUpdate(
        req.params.id,
        { rating, review },
        { new: true, runValidators: true }
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update review', error });
    }
};



const deleteReview = async (req, res) => {
    try {
      const deletedReview = await ReviewSchema.findByIdAndDelete(req.params.id);
  
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete review', error });
    }
};



export {
    createReview,
    getAllReviews,
    getReviewsByUser,
    getReviewsByService,
    updateReview,
    deleteReview
}


  
  
  
  