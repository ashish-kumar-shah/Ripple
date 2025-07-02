const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
      match: [/^[A-Za-z\s]+$/, "Name can only contain alphabets and spaces"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [1024, "Password must be less than 1024 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username must be at most 30 characters long"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    avtar: {
      type: String,
      trim: true,
      default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [160, "Bio must be at most 160 characters"],
    },
    postCount: {
      type: Number,
      default: 0,
      min: [0, "Post count cannot be negative"],
    },
    followerCount: {
      type: Number,
      default: 0,
      min: [0, "Follower count cannot be negative"],
    },
    followingCount: {
      type: Number,
      default: 0,
      min: [0, "Following count cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;
