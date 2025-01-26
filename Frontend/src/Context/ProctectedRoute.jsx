import  { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children,roles}) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {  
    return <div>Loading...</div>;
  }
  console.log("ProtectedRoute user:", user);
  console.log("Allowed roles:", roles);
  if (!user) {
    return <Navigate to="/login" />;
  }

    // Ensure roles are checked against the user's role
  // eslint-disable-next-line react/prop-types
  if (roles && !roles.map((r) => r.toLowerCase()).includes(user.role.toLowerCase())) {
      console.warn("Unauthorized access attempt by role:", user.role);
      return <Navigate to="/" />;
    }
     
      
     
    
  
  return children;
};

export default ProtectedRoute;
