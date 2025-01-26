import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const EditOpportunity = () => {
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState({
    title: "",
    description: "",
    type:"",
    deadline: "",
  });

  

  useEffect(() => {
    const fetchOpportunity = async () => {
      const token = localStorage.getItem("token");
    
      try {
        const response = await fetch(`http://localhost:3000/api/opportunities/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch opportunity.");
        const data = await response.json();
        setOpportunity(data);
       
      } catch (error) {
        console.error("Error fetching opportunity:", error);
        
      }
    };

    fetchOpportunity();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity((prevOpportunity) => ({
      ...prevOpportunity,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/opportunities/${_id}`, {
        method: "PUT",
        headers: {
         
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opportunity),
      });

      if (response.ok) {
        alert("Opportunity updated successfully!");
        navigate("/opportunity-management"); // Redirect after update
      } else {
        alert("Failed to update opportunity.");
      }
    } catch (error) {
      console.error("Error updating opportunity:", error);
      alert("An error occurred while updating the opportunity.");
    }
  };
 

  return (
    <div className="bg-cover bg-center h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 ">Edit Opportunity</h1>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">{user.role}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold">
                Opportunity Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={opportunity.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold">
                Opportunity Description
              </label>
              <textarea
                id="description"
                name="description"
                value={opportunity.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="4"
                required
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-semibold">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={opportunity.deadline}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center"
            >
              <FaEdit className="mr-2" /> Update Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOpportunity;
