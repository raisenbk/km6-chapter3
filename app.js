
const express = require('express')
const morgan = require("morgan")

const app = express();


const customerRouter = require("./routes/customerRoutes")

// middleware untuk membaca json dari request body ke kita
app.use(express.json())

// middleware dari third party = 3rd party middleware
app.use(morgan("dev"))

// middleware kita sendiri
app.use((req, res, next) => {
    console.log('Hello FSW 1, ini middleware kita sendiri..')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})



// const defaultRouter = (req, res, next) => {
//     res.send('<p>Hello FSW 1 tercinta</p>')
// }


// localhost:8000
// app.get('/', defaultRouter)

// app.get('/api/v1/customers', getCustomerData)

//api utk get data by id
// app.get('/api/v1/customers/:id', getCustomerById)

// API untuk update data
// app.patch('/api/v1/customers/:id', updateCustomerData)

// API untuk create new data
// app.post("/api/v1/customers", createCustomerData)

// app.delete('/api/v1/customers/:id', deleteCustomerData)


app.use('/api/v1/customers', customerRouter)

module.exports = app