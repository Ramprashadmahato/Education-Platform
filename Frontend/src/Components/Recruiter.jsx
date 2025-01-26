import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaEye, FaEdit } from "react-icons/fa";

const Recruiter = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="bg-cover bg-center h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 ml-72">Recruiter Dashboard</h1>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
            {user.role}
          </span>
        </div>

        {/* Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Create Opportunity Button */}
          <NavLink
            to="/opportunity"
            className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaPlusCircle className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">Create Opportunity</h2>
              <p className="text-sm opacity-80 mt-2">Add a new opportunity for users.</p>
            </div>
          </NavLink>

          {/* View Opportunities Button */}
          <NavLink
            to="/list"
            className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaEye className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">View Opportunities</h2>
              <p className="text-sm opacity-80 mt-2">Browse all available opportunities.</p>
            </div>
          </NavLink>

          {/* Opportunity Management Button */}
          <NavLink
            to="/opportunity-management"
            className="flex items-center justify-center p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaEdit className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">Opportunity Management</h2>
              <p className="text-sm opacity-80 mt-2">Manage existing opportunities.</p>
            </div>
          </NavLink>

          {/* Edit Submission Button */}
          <NavLink
            to="/submission-manage"
            className="flex items-center justify-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaEdit className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">Submission Management</h2>
              <p className="text-sm opacity-80 mt-2">Manage existing submission</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
