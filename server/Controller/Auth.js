import User from "../Models/userSchema.js"
import jwt from 'jsonwebtoken'
import { hashPassword } from "../Helper/auth.js";
import { comparePassword } from '../Helper/auth.js'

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user)
            return res.status(400).send("User not found");
        const match = await comparePassword(password, user.password)
        if (!match)
            return res.status(400).send("Please enter valid credentials")
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
        user.password = undefined;
        user.cpassword = undefined;
        res.status(200).json({
            token, user
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }

}


const registerUser = async (req, res) => {
    const { name, password, cpassword, age, mobile } = req.body;
    if (!name || !password || !cpassword)
        return res.status(400).send("Please fill all the fields");

    const exist = await User.findOne({ name });
    if (exist)
        return res.status(400).send("User already exist")
    if (cpassword !== password)
        return res.status(400).send("Check your confirm password.")

    const hashpassword = await hashPassword(password);

    const user = new User({
        name,
        password: hashpassword,
        cpassword: hashpassword,

    });
    try {
        user.save();
        return res.status(200).send("User Registered")
    } catch (error) {
        console.log(error.response.data);
    }
}



const currentUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ msg: "Token is not valid" });
            req.user = user;
        });

        console.log(req.user);
        const user = await User.findById(req.user._id)
        // res.setHeader('Content-Type', 'application/json');
        if (user)
            return res.json({
                token, user
            })
        next();

    }
    catch (error) {
        console.log(error);
    }
}


export { loginUser, registerUser, currentUser };