const userModelSchema = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// sing up controller
exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await userModelSchema.findOne({ email })

        // if user already present in our database
        if (user) {
            return res.status(409).json({
                message: "user already exist",
                success: false
            })
        }

        // if not present
        const newUser = new userModelSchema({ name, email, password });
        // before saving the user we encrypt the password
        const genSalt = await bcrypt.genSalt(12);
        newUser.password = await bcrypt.hash(newUser.password, genSalt);
        // now save the user
        await newUser.save();
        res.status(201).json(
            {
                status: "signUp successfully",
                success: true
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                status: "Internal Server",
                success: false
            }
        )

    }
}

// login code
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModelSchema.findOne({ email })
        const erroeMsg = "Auth email and password is wrong or else"

        // if user is not logged in already
        if (!user) {
            return res.status(409).json({
                message: erroeMsg,
                success: false
            })
        }
        // now checking the pasword is while login the password is same or not
        // compare function takes two parameter own password and database password
        const isPassEqual = await bcrypt.compare(password, user.password);
        // if it is not valid
        if (!isPassEqual) {
            res.status(403).json({
                status: erroeMsg,
                success: false
            })
        }
        // agr password equal hai toh humhe jwt toke gernate krna hai user kr liye
        // jwt takes email password
        // second personal secret
        // third expires time
        const token = jwt.sign({ email: user.email, _id: user._id }, "secret-123455", {
            expiresIn: '24h'
        })
        res.status(200).json({
            status: "login successfully",
            token,
            email,
            name: user.name,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Internal Server",
            success: false
        })
    }
}