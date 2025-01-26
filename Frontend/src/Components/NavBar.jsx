import {  NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NotificationManage from "./NotificationManage";



function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Hide the entire navbar if the user is not authenticated
  if (!user) {
    return null; // Return nothing when the user is not logged in
  }

  return (
    <nav className="p-4 bg-slate-100 border-gray-400 text-black">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Common Links */}
        <NavLink to="/" className="hover:text-green-300">
          Home
        </NavLink>

        {/* Role-Based Links */}
        {user.role === "Admin" && (
          <>
            <NavLink to="/dashboard/admin" className="hover:text-green-300">
              Admin Dashboard
            </NavLink>
            
          </>
        )}

        {user.role === "Recruiter" && (
          <>
            <NavLink to="/dashboard/recruiter" className="hover:text-green-300">
              Recruiter
            </NavLink>
          </>
        )}

        {user.role === "Participant" && (
          <>
            <NavLink to="/dashboard/participant" className="hover:text-green-300">
              Participant
            </NavLink>
          </>
        )}

        {/* Common Authenticated User Links */}
        {/* <NavLink to="/leaderboard" className="hover:text-green-300">
          Leaderboard
        </NavLink> */}

       
        <NavLink to="/notifications" className="hover:text-green-300">
          <NotificationManage/>
        </NavLink>
        

        {/* <NavLink to="/list" className="hover:text-green-300">
          Opportunity List
        </NavLink>
        <NavLink to="/opportunity" className="hover:text-green-300">
          Opportunity
        </NavLink>
        <NavLink to="/submission" className="hover:text-green-300">
          Submission
        </NavLink> */}
        <NavLink to="/profile" className="hover:text-green-300">
          Profile
        </NavLink>
       
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
