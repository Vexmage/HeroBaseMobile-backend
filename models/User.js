const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcryptjs'); // Import bcrypt

// how does this work?
// The code below is a schema that defines the structure of a user document in the database.
// The schema defines two fields: username and password.
// The username field is a string that is required and must be unique.
// The password field is a string that is required.
// The schema also includes a pre-save hook that hashes the password before saving it to the database.
// The pre-save hook checks if the password has been modified before hashing it.
// If the password has not been modified, the hook skips hashing the password.
// If the password has been modified, the hook generates a salt and hashes the password using bcrypt.
// The hook then calls the next middleware function.
// The schema is exported as a model named User.


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) { // Hash password before saving
  if (!this.isModified('password')) { // If password is not modified
    return next(); // Skip hashing
  }
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  next(); // Call next middleware
});

module.exports = mongoose.model('User', UserSchema);
