const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
    missionName: {
        type: String,
        required: true
    },
    rocketName: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Mission", missionSchema);