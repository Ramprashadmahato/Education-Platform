import  { useContext } from "react";
import { FaRegSmileWink } from 'react-icons/fa'; 
import MainImage from "../Image/Main.png";
import MeanStackImage from "../Image/MeanStack.png";
import DigitalImage from "../Image/DigitalMarketing.png";
import DataImage from "../Image/DataAlalysis.png";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext"; // Import AuthContext

function Home() {
    const { user } = useContext(AuthContext); // Access user from AuthContext

    return (
        <div className="font-sans p-6">
            {/* Overview Section */}
            <header className="flex flex-col lg:flex-row justify-between px-6 mb-3">
                {/* Text and Buttons Section */}
                <div className="lg:w-1/2 h-[170px] mb-6 lg:mb-0 border-l-4 border-l-gray-500">
                    <h1 className="text-4xl ml-3 font-semibold text-red-400">Welcome to Our Platform</h1>
                    <p className="text-gray-600 ml-3 mt-4 text-lg">
                        Discover, connect, and succeed with our platform. Whether you're new or returning,
                        explore trending opportunities and leverage powerful features to achieve your goals.
                    </p>

                    {/* Conditional Rendering for Buttons or User Name */}
                    <div className="mt-24">
                        {user ? (
                            // Display user's name if logged in
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>
                            <FaRegSmileWink style={{ marginRight: '10px', color: 'orange' }} /> {/* Icon */}
                            Welcome, {user.name}
                        </div>
                        ) : (
                            // Display Login and Sign Up buttons if not logged in
                            <>
                                <NavLink to="/login">
                                    <button
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Login
                                    </button>
                                </NavLink>
                                <NavLink to="/signup">
                                    <button
                                        className="ml-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                                    >
                                        Sign Up
                                    </button>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/3 mt-6 lg:mt-0">
                    <img
                        src={MainImage} // Use the imported variable here
                        alt="Platform Features"
                        className="w-full h-auto rounded-lg shadow-xl"
                    />
                </div>
            </header>

            {/* Trending Opportunities Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Trending Opportunities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 border border-gray-300 rounded-lg text-center shadow-md">
                        <img
                            src={MeanStackImage}
                            alt="Opportunity 1"
                            className="w-full h-48 object-cover rounded-md mb-16"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Mean Stack</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Build full-stack web apps using JavaScript for both client and server, ensuring efficiency and scalability.
                        </p>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg text-center shadow-md">
                        <img
                            src={DigitalImage}
                            alt="Opportunity 2"
                            className="w-full rounded-md object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Digital Marketing</h3>
                        <p className="text-gray-600 text-sm">Promote products and services through digital channels like social media, search engines, and email.</p>
                    </div>
                    <div className="p-6 border border-gray-300 rounded-lg text-center shadow-md">
                        <img
                            src={DataImage}
                            alt="Opportunity 3"
                            className="w-full rounded-md object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Data Analysis</h3>
                        <p className="text-gray-600 text-sm">Inspect, clean, and model data to uncover insights that support informed decision-making.</p>
                    </div>
                </div>
            </section>

            {/* Introduction to Platform Features Section */}
            <section>
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Why Choose Our Platform?</h2>
                <ul className="list-none text-center space-y-4 text-gray-600">
                    <li className="text-lg">🌟 Easy-to-use interface</li>
                    <li className="text-lg">📊 Real-time insights and analytics</li>
                    <li className="text-lg">🌍 A community of professionals and learners</li>
                    <li className="text-lg">🔒 Secure and reliable platform</li>
                </ul>
            </section>
        </div>
    );
}

export default Home;
