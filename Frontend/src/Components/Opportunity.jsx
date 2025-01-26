import { useState } from 'react';
import BackgroundImage from "../Image/Bg6.png";

function Opportunity() {
    const [status, setStatus] = useState(null);

    // Form data state for creating an opportunity
    const [opportunityData, setOpportunityData] = useState({
        title: '',
        description: '',
        type: '',
        deadline: '', // Added deadline field
    });

    const handleCreateOpportunity = async () => {
        const { title, description, type, deadline } = opportunityData;

        // Validate form data
        if (!title || !description || !type|| !deadline) {
            setStatus('Please fill in all fields to create an opportunity.');
            return;
        }

        try {
            // Get authentication token
            const token = localStorage.getItem("token");
            
            // Make API call to create an opportunity
            const response = await fetch('http://localhost:3000/api/opportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(opportunityData), // Include the deadline in the request body
            });
            
            const result = await response.json();

            // Handle response
            if (response.ok) {
                if (result.success) {
                    setStatus('Opportunity successfully created!');
                    setOpportunityData({ title: '', description: '', type: '', deadline: '' }); // Clear the form
                } else {
                    setStatus(result.message || 'Failed to create the opportunity. Please try again.');
                }
            } else {
                setStatus(result.message || 'Failed to create the opportunity. Server error.');
            }
        } catch (error) {
            console.error('Error creating opportunity:', error);
            setStatus('Error creating opportunity. Please try again.');
        }
    };

    const handleOpportunityChange = (e) => {
        const { name, value } = e.target;
        setOpportunityData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
            }}
        >
            <div className="my-8 w-full max-w-md mx-auto p-6 sm:p-8 rounded-md bg-gray-100 shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Opportunity Page
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Create Opportunity Section */}
                    <section className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Create Opportunity</h2>
                        <input
                            type="text"
                            name="title"
                            value={opportunityData.title}
                            onChange={handleOpportunityChange}
                            placeholder="Title"
                            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
                        />
                        <textarea
                            name="description"
                            value={opportunityData.description}
                            onChange={handleOpportunityChange}
                            placeholder="Description"
                            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
                        />
                        <select
                            name="type"
                            value={opportunityData.type}
                            onChange={handleOpportunityChange}
                            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Type</option>
                            <option value="Job">Job</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Internship">Internship</option>
                            <option value="Training">Training</option>
                        </select>
                        {/* Deadline input */}
                        <input
                            type="date"
                            name="deadline"
                            value={opportunityData.deadline}
                            onChange={handleOpportunityChange}
                            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
                            placeholder="Deadline"
                        />
                        <div className="flex justify-center">
                            <button
                                className="py-2 px-6 text-center bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
                                onClick={handleCreateOpportunity}
                            >
                                Create Opportunity
                            </button>
                        </div>
                    </section>
                    {status && <p className="mt-4 text-gray-600">{status}</p>}
                </div>
            </div>
        </div>
    );
}

export default Opportunity;
