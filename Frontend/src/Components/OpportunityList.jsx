import { useState, useEffect } from "react";
import BackgroundImage from "../Image/Bg10.png";
import {useNavigate} from "react-router-dom";

function OpportunityList() {
    // State Variables
    const [opportunitiesData, setOpportunitiesData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch Opportunities from the Backend
    useEffect(() => {
        const fetchOpportunities = async () => {

            setError(null); // Reset error state
            try {
                const response = await fetch("http://localhost:3000/api/opportunities");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Parse JSON response
                console.log("Fetched Data:", data); // Debugging: Log API response

                if (Array.isArray(data)) {
                    setOpportunitiesData(data); // Set data if it's an array
                } else {
                    throw new Error("Invalid data format from API. Expected an array.");
                }
            } catch (err) {
                console.error("Error fetching opportunities:", err.message || err);
                setError("Failed to fetch opportunities. Please try again later.");
            }
        };

        fetchOpportunities();
    }, []);

    // Filter Opportunities based on search and filter criteria
    const filteredOpportunities = Array.isArray(opportunitiesData)
        ? opportunitiesData.filter((opportunity) => {
            return (
                opportunity.title.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        })
        : [];

    // Pagination logic
    const indexOfLastOpportunity = currentPage * itemsPerPage;
    const indexOfFirstOpportunity = indexOfLastOpportunity - itemsPerPage;
    const currentOpportunities = filteredOpportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
            }}
        >
            <div className="max-w-4xl mx-auto p-6 sm:p-8 mt-3 mb-3 rounded-md bg-gray-100">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Opportunity List</h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search Opportunities..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>





                {error && <p className="text-center text-red-600">{error}</p>}

                {/* Opportunities Grid/List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentOpportunities.length === 0 ? (
                        <p className="col-span-3 text-center text-gray-600">No opportunities found</p>
                    ) : (
                        currentOpportunities.map((opportunity) => (
                            <div key={opportunity.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{opportunity.title}</h2>
                                <p className="text-gray-600">Description: {opportunity.description}</p>
                                <p className="text-gray-600">Type: {opportunity.type}</p>
                                <p className="text-gray-600">Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</p>
                                <button
                                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                    onClick={ ()=>{navigate(`/submission/${opportunity._id}`)}}>
                                    Apply Now
                                </button>

                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-2 bg-gray-500 rounded-md text-gray-100 hover:bg-gray-800 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * itemsPerPage >= filteredOpportunities.length}
                        className="ml-4 px-6 py-2 bg-gray-500 rounded-md text-gray-100 hover:bg-gray-800 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OpportunityList;