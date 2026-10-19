const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

router.use(protect);   

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;