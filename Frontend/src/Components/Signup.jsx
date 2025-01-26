import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../Image/Bg3.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password ) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true); // Set loading state to true
    try {

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password}),
      });

      setLoading(false); // Set loading state to false after request completes

      if (response.ok) {
        alert("Thanks for register !!!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch(error) {
      setLoading(false); // Set loading state to false in case of an error
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="font-sans h-[550px] mt-3 mb-3 p-6 max-w-xs mx-auto rounded-md bg-slate-100 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block">
            Name:
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>
          <label className="block">
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>
          <label className="block">
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>
          <label className="block">
            Confirm Password:
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>
         
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-300 text-black font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </a>
        </div>
        </form>
        
      </div>
    </div>
  );
}

export default Signup;
