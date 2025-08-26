import mongoose from "mongoose";
const RegistroSchema = new mongoose.Schema({
  sport: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  startTime:{
    type: String,
    required: true,
    trim: true
  },
  calories:{
    type: Number,
    required: false,
    trim: true
  },
  rhythm:{
    type: Number,
    required: false,
    trim: true
  },
  series: {
    type: Number,
    required: false,
    trim: true
  },
  repetitions: {
    type: Number,
    required: false,
    trim: true
  },
  distance: {
    type: Number,
    required: false,
    trim: true
  },
  weight: {
    type: Number,
    required: false,
    trim: true
  },
  scores: {
    type: Number,
    required: false,
    trim: true
  },
  note: {
    type: String,
    required: false,
    trim: true
  }
},{
  timestamps: true
})

export default mongoose.model("Registro", RegistroSchema)