const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/authMiddleware");

const {
    uploadImage,
    getDashboard,
    getAddMission,
    addMission,
    getEditMission,
    updateMission,
    deleteMission
} = require("../controllers/missionController");

// Dashboard
router.get("/dashboard", isAuthenticated, getDashboard);

// Add Mission
router.get("/add-mission", isAuthenticated, getAddMission);

router.post(
    "/add-mission",
    isAuthenticated,
    uploadImage,
    addMission
);

// Edit Mission
router.get(
    "/edit-mission/:id",
    isAuthenticated,
    getEditMission
);

router.post(
    "/edit-mission/:id",
    isAuthenticated,
    uploadImage,
    updateMission
);

// Delete Mission
router.get(
    "/delete-mission/:id",
    isAuthenticated,
    deleteMission
);

module.exports = router;