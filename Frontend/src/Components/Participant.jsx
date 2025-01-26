import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Participant = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-cover bg-center h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Participant Dashboard</h1>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">{user.role}</span>
        </div>

        <div >
          <NavLink
            to="/list"
            className="flex items-center justify-center p-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaEye className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">View Opportunities</h2>
              <p className="text-sm opacity-80 mt-2">Browse all available opportunities.</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Participant;
