const express = require('express')
const { registrationController, loginController, protectedDashboard } = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const routes = express.Router()

routes.post('/register', registrationController)
routes.post('/login', loginController)
routes.get('/dashboard', auth, protectedDashboard)

module.exports = routes