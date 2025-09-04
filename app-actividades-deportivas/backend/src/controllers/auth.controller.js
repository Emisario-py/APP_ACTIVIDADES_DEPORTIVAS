import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, email, password, name, age, birthday, weight, height, favSport } = req.body

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' })
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' })
      }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      name: name || '',
      age: age || null,
      birthday: birthday || null,
      weight: weight || null,
      height: height || null,
      favSport: favSport || ''
    })

    const userSaved = await newUser.save()

    jwt.sign({
      id: userSaved._id
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d'
    },
    (err, token) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Error generating token' })
      }
      res.cookie('token', token)
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      })
    })
  } catch (error) {
    console.error('Register error:', error)

    if (error.message.includes('ya está registrado')) {
      return res.status(400).json({ message: error.message })
    }

    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(400).json({ message: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }

    jwt.sign({
      id: userFound._id
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d'
    },
    (err, token) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Error generating token' })
      }
      res.cookie('token', token)
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      })
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' })

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
}
