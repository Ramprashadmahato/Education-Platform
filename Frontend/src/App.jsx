import Home from './Components/Home';
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Opportunity from './Components/Opportunity';
import Submission from './Components/Submission';
import Leaderboard from './Components/Leaderboard';
import OpportunityList from './Components/OpportunityList';

import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Footer from './Components/Footer';


import Admin from './Components/Admin';
import UserManagement from './Components/UserManagement';
import Analytics from './Components/Analytics';
import EditUser from './Components/EditUser';
import EditOpportunity from './Components/EditOpportunity';
import OpportunityManagement from'./Components/OpportunityManagement';
import EditSubmission from './Components/EditSubmission'
import SubmissionManage from './Components/SubmissionManage';
import Recruiter from './Components/Recruiter';
import Participant from './Components/Participant';
import ProtectedRoute from "./Context/ProctectedRoute"; // Fixed typo
import NotificationsPage from './Components/Notificationpage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Protected Routes */}
        <Route
          path="/opportunity"
          element={
            <ProtectedRoute>
              <Opportunity />
            </ProtectedRoute>
          }
        />
       
        
        <Route
          path="/submission/:_id"
          element={
            <ProtectedRoute  roles={["Participant"]} >
              <Submission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagement/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:userId"
          element={
            <ProtectedRoute>
              <EditUser/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-opportunity/:_id"
          element={
            <ProtectedRoute>
              <EditOpportunity/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/opportunity-management"
          element={
            <ProtectedRoute>
              <OpportunityManagement/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-submission/:_id"
          element={
            <ProtectedRoute>
              <EditSubmission/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submission-manage"
          element={
            <ProtectedRoute roles={["Admin", "Recruiter"]} >
              <SubmissionManage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <OpportunityList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
         
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <div><Admin /></div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard/recruiter"
          element={
            <ProtectedRoute roles={["Recruiter"]}>
              <div><Recruiter /></div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/participant"
          element={
            <ProtectedRoute roles={["Participant"]}>
              <div><Participant /></div>
            </ProtectedRoute>
          }
        />
        {/* Catch-All Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;