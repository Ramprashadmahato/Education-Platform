const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middleware/middleware");
const { getOpportunityById, getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } = require("../controller/opportunityController");

// Route for getting all opportunities (Admin and Recruiter)
router.get("/",getOpportunities);
router.get("/:id",  getOpportunityById);

// Route for creating a new opportunity (Admin and Recruiter)
router.post("/", verifyToken, verifyRole(["Admin", "Recruiter"]), createOpportunity);

// Route for updating an opportunity 
router.put("/:id", verifyToken, verifyRole([ "Recruiter"]), updateOpportunity);

// Route for deleting an opportunity 
router.delete('/:id', verifyToken, verifyRole(["Recruiter"]),  deleteOpportunity);

module.exports = router;
