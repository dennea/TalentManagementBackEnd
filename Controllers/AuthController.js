import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

// Registering a new User
export const registerUser = async(req,res) => {
    //hash the password for security 
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password,salt)
    req.body.password = hashedPass
    // create a new user and add the user to the db 
    const newUser = new UserModel(req.body);

    const {username} = req.body
    try {

        const oldUser = await UserModel.findOne({username})
        if (oldUser){
            return res.status(400).json({message: "username is already registered"})
        }
        const user = await newUser.save()

        // create the token 
        const token = jwt.sign({
            username: user.username , id: user._id
        }, process.env.JWT_KEY, {expiresIn: '1h'})

        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Login User
export const loginUser = async(req,res) => {
    const {username, password} = req.body
    try {
        const user = await UserModel.findOne({username: username})

        if(user){
            // if the user exists check that the password matches
            const validity = await bcrypt.compare(password,user.password)

            if (!validity) {
                res.status(400).json("Wrong Password")
            } else {
                // create the token 
                const token = jwt.sign({
                    username: user.username , id: user._id
                }, process.env.JWT_KEY, {expiresIn: '1h'})

                res.status(200).json({user,token})
            }
            
        } else {
            res.status(404).json("User does not exist")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}