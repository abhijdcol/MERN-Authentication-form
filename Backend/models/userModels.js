import mongoose from "mongoose";
import bcrypt from "bcryptjs"; //bcrypt is used to create hashed password
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// before save the new user credentials create hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // this.password is in plain text & we are gonna changing it in hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
