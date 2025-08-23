import { useState } from "react";
import { login, register } from "../services/auth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // alternar login/registro
  const [form, setForm] = useState({
    name: "",
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    identifier: "" // para login (usuario o email)
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(form.identifier, form.password);
        window.location.href = "/dashboard";
      } else {
        const res = await register(form);
        setMessage(res.message);
        setIsLogin(true); // después de registrar, vuelve a login
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Log in" : "Sign up"}
        </h2>
        {message && <p className="mb-2 text-red-500">{message}</p>}

        {isLogin ? (
          <>
            {/* LOGIN */}
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={form.identifier}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <button className="bg-blue-500 text-white p-2 rounded w-full">
              Log in
            </button>
            <p
              onClick={() => setIsLogin(false)}
              className="mt-3 text-sm text-gray-600 cursor-pointer text-center"
            >
              or, sign up
            </p>
          </>
        ) : (
          <>
            {/* REGISTRO */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="text"
              name="user"
              placeholder="Username"
              value={form.user}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <button className="bg-green-500 text-white p-2 rounded w-full">
              Create Account
            </button>
            <p
              onClick={() => setIsLogin(true)}
              className="mt-3 text-sm text-gray-600 cursor-pointer text-center"
            >
              Already have an account? Login here
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Auth;
