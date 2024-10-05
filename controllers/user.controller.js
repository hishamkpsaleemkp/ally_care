import { UserSchema } from '../models/index.js';
import { validateEmail, validatePassword } from '../utils/validation.js';
import bcrypt from 'bcryptjs';


const getUser = (req, res) => {
    try{
        const { mobileNumber, password, email, userName, addresses } = req.userId;
        res.status(200).json({mobileNumber, password, email, userName, addresses});
     }
     catch(error){
        res.status(500).json({error: 'Failed to fetch user details'});
     }
}


const updateUser = async(req, res) => {
   const userId = req.userId;
  try{
     const updates = {
      userName: req.body.userName,
      email: req.body.email,
      addresses: req.body.addresses,
      password: req.body.password 
     }

     if (!validateEmail(req.body.email)){
      return res.status(400).json({message: emailValid.message});
     }

     if (!validatePassword(password)) {
      return res.status(400).json({ message: passwordValid.message });
     }

     if (req.body.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updates.password = hashedPassword;
     }

     const user = await UserSchema.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
     });

     if (!user){
      return res.status(404).json({ message: 'User not found' });
     }
     
     const { password, ...updatedUser } = user.toObject();
     res.status(200).json(updatedUser);


  }
  catch(error){
     console.error('Update error:', error);
     res.status(500).json({ message: 'failed to update user details' });
  }
}

export { 
    getUser,
    updateUser
}