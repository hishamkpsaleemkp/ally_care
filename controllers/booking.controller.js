import { BookingSchema } from "../models/index.js";

const makeBooking = async (req, res) => {
    const { service,addOns, appointmentTime, location, totalPrice, advance, paymentStatus } = req.body;
    const userId = req.userId;
    try {
        const newBooking = new BookingSchema({ user: userId, service, addOns, appointmentTime, location, totalPrice, advance, paymentStatus });
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'failed to create booking', error });
    }
};


const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingSchema.find().populate('user').populate('service');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};


const getMyBookings = async (req, res) => {
    try{
        const userId = req.userId;

        const bookings = await BookingSchema.find({ user: userId }).populate('user').populate('service');

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch bookings', error });
    }
};


const getBookingByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};
        if(status){
            filter.status = status;
        }

        const bookings = await BookingSchema.find(filter).populate('user').populate('service');
        if (!bookings){
            // console.log("the list is empty");
        }
        res.status(200).json(bookings);
    } catch (error){
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};


const getBooking = async (req, res) => {
    try {
      const booking = await BookingSchema.findById(req.params.id).populate('user').populate('service');
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch booking', error });
    }
};



const updateBooking = async (req, res) => {
    const { status, paymentStatus, appointmentTime, location } = req.body;
  
    try {
      const updatedBooking = await BookingSchema.findByIdAndUpdate(
        req.params.id,
        { status, paymentStatus, appointmentTime, location, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update booking', error });
    }
};



// const deleteBooking = async (req, res) => {
//     try {
//       const deletedBooking = await BookingSchema.findByIdAndDelete(req.params.id);
//       if (!deletedBooking) {
//         return res.status(404).json({ message: 'Booking not found' });
//       }
//       res.status(200).json({ message: 'Booking deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to delete booking', error });
//     }
// };

export {
    makeBooking,
    getAllBookings,
    getMyBookings,
    getBookingByStatus,
    getBooking,
    updateBooking
}