const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')


const protact = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get the token
            token = req.headers.authorization.split(' ')[1]

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (e) {
            console.log(e)
            res.status(401)
            throw new Error('NOT authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('NOT authorized, no token')
    }
})

module.exports = { protact }