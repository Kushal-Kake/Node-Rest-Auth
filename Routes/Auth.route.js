const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Modules/User.module')
const {Auth_Schema} = require('../Helpers/validation.schema')
const {singAccessToken} = require('../Helpers/jwt_helper')
router.post('/register', async(req, res, next) => {
    // console.log(req.body)
    try {
        //const {email, password} = req.body;
        // if(!email || !password) throw createError.BadRequest()
        const result = await Auth_Schema.validateAsync(req.body)
        const doesExit = await User.findOne({email : result.email})
        if(doesExit) throw createError.Conflict(`${result.email} is already exits`)
        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await singAccessToken(savedUser.id)
        res.send({accessToken})
    }
    catch(err) {
        if(err.isJoi === true) {
            err.status = 422
        }
        next(err)
    }
})

router.post('/login', async(req, res, next) => {
    try{
        const result = await Auth_Schema.validateAsync(req.body)
        const user = await User.findOne({email: result.email})
        if(!user) throw createError.NotFound('User not registered')
        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createError.Unauthorized('Username/Password not valid')
        res.send(result)
    }
    catch(err) {
        if(err.isJoi === true) 
        return next(createError.BadRequest('Invalid Username/Password'))
        next(err)
    }
})

router.post('/refresh-token', async(req, res, next) => {
    res.send('Refrest-Token Route')
})

router.delete('/logout', async(req, res, next) => {
    res.send('Logout Route')
})

module.exports = router