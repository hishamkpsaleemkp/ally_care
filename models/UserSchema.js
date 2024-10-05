import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String},
  email: { type: String },
  addresses: {
    type: [String], // This should be an array of strings
    validate: [arrayLimit, '{PATH} exceeds the limit of 3 addresses'] // Validate array length
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

function arrayLimit(val) {
  return val.length <= 3; // Limits the number of addresses to 3
}

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save hook to update updatedAt field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
const UserSchema = mongoose.model('UserSchema', userSchema);
export default UserSchema; 
