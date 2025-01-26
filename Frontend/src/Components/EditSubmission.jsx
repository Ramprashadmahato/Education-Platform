import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditSubmission = () => {
  const { _id } = useParams(); 
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/submissions/${_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch submission');
        }

        const data = await response.json();
        setSubmission(data);
        setStatus(data.status);
        setFeedback(data.feedback || '');
      } catch (error) {
        alert('Error fetching submission details');
      }
    };
    fetchSubmission();
  }, [_id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/submissions/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to update submission');
      }

      alert('Submission updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Error updating submission');
    }
  };

  if (!submission) {
    return <div className="text-center mt-20 text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-cover bg-center h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Edit Submission</h1>
        <form onSubmit={handleEdit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:bg-blue-800 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubmission;
