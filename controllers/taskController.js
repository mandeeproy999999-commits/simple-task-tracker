const Task = require("../models/Task");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const createTask = async (req, res) => {

    try {

        const { title } = req.body;

        if (!title) {

            return res.status(400).json({
                message: "Title is required"
            });

        }

        const task = await Task.create({ title, user: req.userId });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteTask = async (req, res) => {

    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateTask = async (req, res) => {

    try {

        const { title, status } = req.body;

        const update = {};

        if (title !== undefined) update.title = title;

        if (status !== undefined) {
            update.status = status;
            
            update.completedAt = status === "Completed" ? new Date() : null;
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            update,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};