const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending"
        },
        completedAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);