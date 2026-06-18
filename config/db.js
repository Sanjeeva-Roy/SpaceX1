const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://sanjeevroy2006_db_user:s8a8n2j0e0e6v@cluster1.pt34oo2.mongodb.net/spacex_management?retryWrites=true&w=majority"
        );

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;