const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
  singAccessToken: (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {
            //iss: 'kake.com'
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1h",
            issuer: 'kake.com',
            audience: userID
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) {
                console.log(err.message)
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
  },

  verifyAccessToken:  (req, res, next) => {
    if(!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    //const [bearer, token] = req.headers.split(' ')
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            return next(createError.Unauthorized())
        }
        req.payload = payload
        next()
    })
  }
}