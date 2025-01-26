import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate} from "react-router-dom";
import BackgroundImage from "../Image/Bg3.png";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        // Login user and navigate to the role-specific dashboard
        login(data.token, data.role, data.name, data.email);
        alert("Login successfully.....!");
        navigate('/');
      } else {
        // Show appropriate error message
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="font-sans h-auto mt-3 mb-3 p-6 max-w-sm mx-auto rounded-md bg-slate-100 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-300 text-black font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Login
          </button> 
        <div className="text-center mt-4">
          <a href="/signup" className="text-blue-500 hover:underline">
          Don't have an account? Signup
          </a>
        </div>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
