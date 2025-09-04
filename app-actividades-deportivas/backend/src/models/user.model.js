import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    min: 0
  },
  birthday: {
    type: Date
  },
  weight: {
    type: Number,
    min: 0
  },
  height: {
    type: Number,
    min: 0
  },
  favSport: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Middleware para manejar errores de duplicado
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    next(new Error(`${field} ya está registrado`))
  } else {
    next(error)
  }
})

export default mongoose.model('User', userSchema)
