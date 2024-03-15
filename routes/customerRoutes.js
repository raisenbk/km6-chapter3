
const express = require("express")
const router = express.Router()


const customerController = require("../controllers/customerController")

router.route('/').get(customerController.getCustomerData).post(customerController.createCustomerData)
router.route("/:id").get(customerController.getCustomerById).patch(customerController.updateCustomerData).delete(customerController.deleteCustomerData)

module.exports = router