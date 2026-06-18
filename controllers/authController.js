const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Register Password:", password);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Hashed Password:", hashedPassword);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.redirect("/login");

    } catch (error) {
        console.log(error);
        res.send("Registration Failed");
    }
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid Email");
        }

        console.log("Entered Password:", password);
        console.log("Stored Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.send("Invalid Password");
        }

        req.session.userId = user._id;

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Login Failed");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};