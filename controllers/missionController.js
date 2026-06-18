const Mission = require("../models/Mission");
const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

exports.uploadImage = upload.single("image");

// Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const missions = await Mission.find();

        res.render("dashboard", {
            missions
        });
    } catch (error) {
        console.log(error);
        res.send("Error Loading Dashboard");
    }
};

// Add Mission Page
exports.getAddMission = (req, res) => {
    res.render("addMission");
};

// Add Mission
exports.addMission = async (req, res) => {
    try {
        await Mission.create({
            missionName: req.body.missionName,
            rocketName: req.body.rocketName,
            launchDate: req.body.launchDate,
            description: req.body.description,
            image: req.file ? req.file.path : ""
        });

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Mission Add Failed");
    }
};

// Edit Mission Page
exports.getEditMission = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);

        res.render("editMission", {
            mission
        });

    } catch (error) {
        console.log(error);
        res.send("Mission Not Found");
    }
};

// Update Mission
exports.updateMission = async (req, res) => {
    try {
        const updatedData = {
            missionName: req.body.missionName,
            rocketName: req.body.rocketName,
            launchDate: req.body.launchDate,
            description: req.body.description
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        await Mission.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Mission Update Failed");
    }
};

// Delete Mission
exports.deleteMission = async (req, res) => {
    try {
        await Mission.findByIdAndDelete(req.params.id);

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Mission Delete Failed");
    }
};