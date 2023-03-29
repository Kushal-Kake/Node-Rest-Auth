const mongoose  = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {dbName : process.env.DB_NAME, useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {
    console.log(`DB connected successfully!!!`)
})
.catch(err => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connceted to db`)
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log(`Mogoose disconnected successfully!`)
})
// process.on('SIGINT', async() => {
//     await mongoose.connection.close()
//     process.exit(0)
// })
