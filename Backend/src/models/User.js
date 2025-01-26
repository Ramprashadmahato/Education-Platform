const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["Admin", "Recruiter", "Participant"],
      default: "Participant"
    },
    profile: {
      bio: { type: String },
      resume: { type: String },
      participationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" }],
    },
  },
  { timestamps: true }
);


// Password hashing middleware
userSchema.pre("save", async function (next) {
  // Hash the password only if it has been modified or is new
  if (!this.isModified("password")) return next();

  // Generate salt for hashing
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare entered password with the hashed password in the database
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to update the user (ensure password is hashed only if it's updated)
userSchema.methods.updateUser = async function (updates) {
  // Update the fields except password
  Object.keys(updates).forEach(key => {
    if (key !== 'password') {
      this[key] = updates[key];
    }
  });

  // If password is provided in the update, hash it
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(updates.password, salt);
  }

  await this.save(); // Save the updated user
};

module.exports = mongoose.model("User", userSchema);
