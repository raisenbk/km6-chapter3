const fs = require("fs")
const express = require('express')

const app = express();
const PORT = 8000;

// middleware untuk membaca json dari request body ke kita
app.use(express.json())

const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/data/dummy.json`)
    );

const defaultRouter = (req, res, next) => {
    res.send('<p>Hello FSW 1 tercinta</p>')
}

const getCustomerData = (req, res, next) => {
    
    res.status(200).json({
        status: "success",
        totalData: customers.length,
        data: {
            customers
        }
    })
}

const getCustomerById = (req, res, next) =>{
    const id = req.params.id

    // menggunakan array method untuk membantu menemukan spesifik data (DIPAKAI DI FRONT END)
    const customer = customers.find(cust => cust._id === id)
    
    // shortcut pemanggilan objek
    // const { id } = req.params;
    // console.log(id);

    res.status(200).json({
        status: "success",
        data: {
            customer
        }
    })
}

const updateCustomerData = (req, res) => {
    const id = req.params.id
    
    // if(id)

    // 1. Melakukan pencarian data yang sesuai dengan parameter id nya
    const customer = customers.find(cust => cust._id === id)
    const customerIndex = customers.findIndex(cust => cust._id === id)

    // 2. Melakukan validasi, ada gak data customer nya
    if(!customer){
        return res.status(404).json({
            status: "Fail",
            message: `customer dengan ID: ${id} gak ada`
        })
    }

    // 3. Kalau ada, berarti update data nya sesuai request body dari client/user
    // object assign = menggambungkan objek OR spread operator
    customers[customerIndex] = {...customers[customerIndex], ...req.body}

    // 4. Melakukan update di dokumen json nya
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
        res.status(200).json({
            status: 'success',
            message: 'berhasil update data',
        })
    })

    // res.status(200).json({
        
    // })
}

const createCustomerData = (req, res) => {
    console.log(req.body)

    const newCustomer = req.body

    customers.push(newCustomer);

    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), 
    (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                customer: newCustomer
            }
        })
    })
}

const deleteCustomerData = (req, res) => {
    const id = req.params.id

    // 1. Melakukan pencarian data yang sesuai dengan parameter id nya
    const customer = customers.find(cust => cust._id === id)
    const customerIndex = customers.findIndex(cust => cust._id === id)

    // 2. Melakukan validasi, ada gak data customer nya
    if(!customer){
        return res.status(404).json({
            status: "Fail",
            message: `customer dengan ID: ${id} gak ada`
        })
    }

    // 3. Kalau ada, berarti hapus data nya
    customers.splice(customerIndex, 1);

    // 4. Melakukan update di dokumen json nya
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
        res.status(200).json({
            status: 'success',
            message: 'berhasil hapus data',
        })
    })
}

// localhost:8000
app.get('/', defaultRouter)

// app.get('/api/v1/customers', getCustomerData)

//api utk get data by id
// app.get('/api/v1/customers/:id', getCustomerById)

// API untuk update data
// app.patch('/api/v1/customers/:id', updateCustomerData)

// API untuk create new data
// app.post("/api/v1/customers", createCustomerData)

// app.delete('/api/v1/customers/:id', deleteCustomerData)

app.route('/api/v1/customers').get(getCustomerData).post(createCustomerData)
app.route("/api/v1/customers/:id").get(getCustomerById).patch(updateCustomerData).delete(deleteCustomerData)

app.listen(PORT, () => {
    console.log(`APP running on port: ${PORT}`)
});
