function validateMobileNumber(mobileNumber){
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNumber) {
        return { isValid: false, message: "Mobile number is required." };
    }

    if (mobileRegex.test(mobileNumber)) {
        return { isValid: true, message: "Mobile number is valid." };
    } else {
        return { isValid: false, message: "Invalid mobile number format. Please enter a 10-digit number." };
    }
}

function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return { isValid: false, message: 'Email is required' };
      }
    
      if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Invalid email format' };
      }
    
      return { isValid: true, message: 'Valid email' };
}

function validatePassword(password){
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
        return { isValid: false, message: 'Password is required' };
      }
    
      if (!passwordRegex.test(password)) {
        return { isValid: false, message: 'Password must be at least 8 characters long, include at least 1 letter, 1 number, and 1 special character.' };
      }
    
      return { isValid: true, message: 'Valid password' };
}

export { validateMobileNumber, validateEmail, validatePassword };

