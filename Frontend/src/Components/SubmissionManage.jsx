import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubmissionManage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/submissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }

        const data = await response.json();
        console.log(data);
        setSubmissions(data.submissions);
      } catch (error) {
        setStatus("Error fetching submissions");
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Reviewed":
        return "bg-blue-500 text-white";
      case "Approved":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-cover min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 ml-[18rem]">All Submissions</h1>
        </div>

        {status && <div className="mb-4 text-center text-red-500 font-bold">{status}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-700 mb-2">
                <strong>Opportunity ID:</strong> {submission._id || "Anonymous"}
              </p>

              <p className="text-gray-700">
                <strong>User:</strong> {submission.userId?.name || "Anonymous"}
              </p>

              <p className="text-gray-700">
                <strong>Email:</strong> {submission.userId?.email || "N/A"}
              </p>

              <div
                className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(
                  submission.status
                )}`}
              >
                {submission.status}
              </div>

              <p className="mt-4 text-gray-700">
                <strong>Feedback:</strong>{" "}
                {submission.feedback || "No feedback yet"}
              </p>

              <button
                onClick={() => {
                  navigate(`/edit-submission/${submission._id}`);
                }}
                className="mt-6 w-full bg-green-300 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Edit Submission
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionManage;
