const Opportunity = require("../models/opportunity");

const createOpportunity = async (req, res) => {
  try {
    const { title, description, type, deadline } = req.body;
    
    // Ensure 'createdBy' is set to the current user's id from the token
    const opportunityData = {
      title,
      description,
      type,
      createdBy: req.user.id,  // Using the decoded user id
      deadline,
    };

    // Create the opportunity
    const opportunity = new Opportunity(opportunityData);
    await opportunity.save();

    res.status(201).send({ success: true, message: "Opportunity created successfully!", opportunity });
  } catch (error) {
    console.error("Error creating opportunity:", error);
    res.status(500).send({ message: "Failed to create the opportunity. Please try again." });
  }
};


// Get all opportunities
const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate("createdBy", "name email");
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch opportunities" });
  }
};

// Get an opportunity by ID
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate("createdBy", "name email");
    if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch opportunity" });
  }
};

// Update an opportunity
const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, deadline } = req.body;

    // Find and update the opportunity
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      id,
      { title, description, type, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedOpportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    res.status(200).json(updatedOpportunity);
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOpportunity = async (req, res) => {
  try {
    const opportunityId = req.params.id; // Opportunity ID from request params
    const deletedOpportunity = await Opportunity.findByIdAndDelete(opportunityId);

    if (!deletedOpportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    res.status(200).json({ message: 'Opportunity deleted successfully', opportunity: deletedOpportunity });
  } catch (error) {
    console.error('Error deleting opportunity:', error.message);
    res.status(500).json({ error: 'Failed to delete opportunity' });
  }
};
module.exports = {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};
