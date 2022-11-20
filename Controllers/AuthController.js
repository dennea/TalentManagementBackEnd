import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'

// Registering a new User
export const registerUser = async(req,res) => {
    const {username, password, firstname, lastname} = req.body;

    //hash the password for security 
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

    // create a new user and add the user to the db 
    const newUser = new UserModel({
        username, 
        password: hashedPass, 
        firstname, 
        lastname});

    try {
        await newUser.save()
        res.status(200).json(newUser)
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
            
            validity? res.status(200).json(user): res.status(400).json("Wrong Password")
        } else {
            res.status(404).json("User does not exist")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}