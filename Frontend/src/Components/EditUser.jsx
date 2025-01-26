import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";

const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "", // password can be empty if not changed
    role: "Participant",
    profile: {
      bio: "",
      resume: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  // Fetch user details for editing
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user details.");
        }

        const data = await response.json();
        setUser(data);  // Set the user data to edit
        setLoading(false);
      } catch (err) {
        setError("Error fetching user details.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle profile input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      profile: {
        ...prevUser.profile,
        [name]: value,
      },
    }));
  };

  // Handle user update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Make sure to only include the password field if it's non-empty
    const requestData = {
      name: user.name,
      email: user.email,
      password: user.password || undefined, // only include password if it's not empty
      role: user.role,
      profile: user.profile,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: {
           Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Error updating user.");
      }

      setStatus("User updated successfully.");
      navigate("/user-management");  // Redirect to the user management page after successful update
    } catch (err) {
      setError("Error updating user.");
    } finally {
      setIsSaving(false);  // Re-enable the button after the action is done
    }
  };

  return (
    <div className=" min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-8">Edit User</h1>

        {/* Error/Status message */}
        {error && <p className="text-red-600">{error}</p>}
        {status && <p className="text-green-600">{status}</p>}

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading user details...</div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700">Role</label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Participant">Participant</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={user.profile.bio}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 mt-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-semibold text-gray-700">Resume</label>
              <input
                type="text"
                id="resume"
                name="resume"
                value={user.profile.resume}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition duration-300"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : <><FaSave className="mr-2" /> Save Changes</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;
