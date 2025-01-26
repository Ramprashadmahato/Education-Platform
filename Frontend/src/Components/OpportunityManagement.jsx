import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const OpportunityManagement = () => {
  const [opportunities, setOpportunities] = useState([]); // List of opportunities
  const [status, setStatus] = useState(null); // To display status messages
 
  const navigate = useNavigate();

  // Fetch all opportunities when the component mounts
  useEffect(() => {
    const fetchOpportunities = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/opportunities", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch opportunities.");
        const data = await response.json();
        setOpportunities(data); // Update state with fetched opportunities
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setStatus(`Error: ${error.message}`);
      }
    };

    fetchOpportunities();
  }, []);

  // Handle Delete Opportunity
  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/opportunities/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Add the token
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete opportunity");
      }
  
      // Remove the deleted opportunity from the state
      setOpportunities((prev) => prev.filter((opportunity) => opportunity._id !== _id));
      setStatus("Opportunity deleted successfully");
    } catch (error) {
      console.error("Error deleting opportunity:", error.message);
      setStatus(`Error: ${error.message}`);
    } 
  };
  
  // Navigate to Edit Opportunity page
  const handleEdit = (_id) => {
    navigate(`/edit-opportunity/${_id}`);
  };

  return (
    <div className="bg-cover bg-center h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 ml-[18rem]">Manage Opportunities</h1>
        </div>

        {/* Status Message */}
        {status && <div className="mb-4 text-center text-red-500 font-bold">{status}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {opportunities.map((opportunity) => (
            <div key={opportunity._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">{opportunity.title}</h2>
              <p className="text-sm mt-2">{opportunity.description}</p>
              <p className="text-gray-600">Type: {opportunity.type}</p>
              <p className="text-gray-600">
                Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
              </p>

              <div className="flex space-x-4 mt-4">
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(opportunity._id)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <FaEdit />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(opportunity._id)}
                  className="text-red-600 hover:text-red-800"
                  
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityManagement;
