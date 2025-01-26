const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema(
  {
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity", // References the Opportunity collection
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User collection
    },
    fileUrl: {
      type: String,
      required: true, // Ensures fileUrl is always provided
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Approved", "Rejected"], // Limits possible values for status
      default: "Pending", // Default status is "Pending"
    },
    feedback: {
      type: String,
      default: "", // Default feedback is an empty string
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("submission", submissionSchema);
