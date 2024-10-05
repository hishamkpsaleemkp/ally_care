import express from 'express';
import auth from '../../middleware/auth.js';

import { getUser, updateUser } from '../../controllers/user.controller.js';
import { createServiceCategory,
         getAllServiceCategory,
         getServiceCategory,
         updateServiceCategory,
         deleteServiceCategory } from '../../controllers/serviceCategory.controller.js'

import { createService,
   getAllServices,
   getService,
   getServiceByCategory,
   updateService,
   deleteService} from '../../controllers/services.controller.js';

import { createBlog,
   getAllBlogs,
   getBlog,
   updateBlog,
   deleteBlog } from '../../controllers/blog.controller.js';
   
import {
   makeBooking,
    getAllBookings,
    getMyBookings,
    getBookingByStatus,
    getBooking,
    updateBooking } from '../../controllers/booking.controller.js';


import { createContact, getAllContacts } from '../../controllers/contactForm.controller.js';

import { createFaq,
   getAllFaqs,
   getFaq,
   updateFaq,
   deleteFaq } from '../../controllers/faq.controller.js';


import { createNotification,
   getUserNotifications,
   markNotificationAsRead,
   deleteNotification } from '../../controllers/notification.controller.js';   


import { createReview,
   getAllReviews,
   getReviewsByUser,
   getReviewsByService,
   updateReview,
   deleteReview } from '../../controllers/review.controller.js';   

const router = express.Router();

//getting a single user
router.get('/user', auth, getUser);
//Updating a user details
router.patch('/user/update', auth, updateUser);


//create a service category
router.post('/serviceCategory', createServiceCategory);
//get all service category
router.get('/getAllServiceCategory', getAllServiceCategory);
// get a single service category
router.get('/serviceCategory/:id', getServiceCategory);
// update service category
router.patch('/serviceCategory/updste/:id', updateServiceCategory);
// delete service category
router.delete('/serviceCategory/:id', deleteServiceCategory);


//create a service
router.post('/service',createService);
// get all services
router.get('/service/getAll',getAllServices);
// get a single service
router.get('/getService/:id',getService);
// get services by category
router.get('/service/category/:id',getServiceByCategory);
// update service
router.patch('/sercice/update/:id',updateService);
// delete service
router.delete('/service/delete/:id',deleteService);


// create a blog
router.post('/createBlog', createBlog);
// get all blogs
router.get('/blogs', getAllBlogs);
// get a single blog
router.get('/blogs/:id',getBlog);
// update blog
router.patch('/blogs/update/:id', updateBlog);
// delete blog
router.delete('/blogs/delete/:id', deleteBlog);



// make booking
router.post('/booking', makeBooking);
// get all bookings
router.get('/booking/all', getAllBookings)
// get booking by user
router.get('/mybookings', getMyBookings);
// get booking filtered by status
router.get('/booking/status', getBookingByStatus);
// get a single booking by id
router.get('/booking/:id', getBooking);
// update bookings by id
router.patch('/booking/update/:id', updateBooking);



// create contact form
router.post('/contact', createContact);
// get all contact forms
router.get('/contactAll', getAllContacts);


// create faq
router.post('/FAQ', createFaq);
// get all faqs
router.get('/FAQs', getAllFaqs);
// get a single faq by id
router.get('/FAQs/:id', getFaq);
// update faq by id
router.patch('/FAQs/update/:id', updateFaq);
// delete a faq by id
router.delete('/FAQs/delete/:id', deleteFaq);


// create notification
router.post('/notification', createNotification);
// get notification by user
router.get('/notification/user/:id', getUserNotifications);
// update notification mark read
router.patch('/notification/update/:id', markNotificationAsRead);
// delete notification by id
router.delete('/notification/delete/:id', deleteNotification);



// create review
router.post('/review', createReview);
// get all reviews
router.get('/reviewAll', getAllReviews);
// get reviews by user
router.get('/review/user/:id', getReviewsByUser);
// get reviews by service
router.get('/review/:serviceId', getReviewsByService);
// update review by id
router.patch('/review/update/:id', updateReview);
// delete review by id
router.delete('/review/delete/:id', deleteReview);



export default router;