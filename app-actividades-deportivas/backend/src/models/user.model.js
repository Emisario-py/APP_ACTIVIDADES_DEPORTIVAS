import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    trim: true
  },
  birthday: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: false,
    trim: true
  },
  height: {
    type: Number,
    required: false,
    trim: true
  },
  favSport: {
    type: String,
    required: false,
    trim: true
  }
},{
  timestamps: true
})

export default mongoose.model("User", userSchema)