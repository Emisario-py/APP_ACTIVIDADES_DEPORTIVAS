import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 📌 Registro
router.post("/register", async (req, res) => {
  try {
    const { name, user, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    // Validar si ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { user }] });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario o email ya registrados" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      user,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

// 📌 Login (usuario o email + contraseña)
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // "identifier" puede ser email o usuario

    // Buscar por user o email
    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { user: identifier }],
    });

    if (!existingUser) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Validar contraseña
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: existingUser._id, user: existingUser.user, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

export default router;
