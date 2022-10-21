
const User = require('../models/user_model.js')
const bcrypt = require('bcrypt')


const addUser = async (req, res) => {
    const userData = req.body
    const password=userData.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    userData.password = hashedPassword
    const newUser=  User.build({
        "fullname": userData.fullname,
        "email": userData.email,
        "password": userData.password
      
    })
    console.log(userData)
    try {
        await newUser.save()
        res.status(200).json(newUser)
    }catch (error){
        res.json(error)
    }

}

const getAllUsers = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json(users)
    
}

const loginUser = async (req, res) => {
    let email = req.body.email
    const password = req.body.password
    let user = await User.findOne({ where: {email: email}})

    if (!user){
        return res.status(404).json({succes:false, "message":" user not found"})
        
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword){
        return res.status(404).json({succes:false, "message": "Incorrect password"})
    }

    const username = user.fullname
    if(user && correctPassword){
        return res.status(200).json({succes:true, username,"message":"user has looged"})
    }

}


module.exports = {
    addUser, getAllUsers, loginUser
}