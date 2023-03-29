const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const AuthRoute = require('./Routes/Auth.route')
const {verifyAccessToken} = require('./Helpers/jwt_helper')
require('dotenv').config()
require('./Helpers/initMongodb')
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const PORT = process.env.PORT || 3000
app.get('/', verifyAccessToken, async (req, res) => {
    //console.log(req.headers['authorization'])
    res.send(`Hello World!`)
})
app.use('/auth', AuthRoute)
app.use(async(req, res, next) => {
    // const error = new Error('Not found')
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})
app.use((err, req, res, next) =>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})
app.all(async(req, res, next) => {
    const err = new Error ('Not Found')
    err.status = 404
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}....`)
})