const express = require('express')
const authController = require('./controllers/auth-controller')
const dashboardController = require('./controllers/dashboard-controller')
const { autMiddleware, ensureUserIsAdmin } = require('./middlewares/auth-middleware')

const router = express.Router()

router.get('/', authController.index)

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/auth/logout', autMiddleware, authController.logout)

router.get('/dashboard', autMiddleware, dashboardController.dashboard)

router.get('/dashboard/users', autMiddleware, ensureUserIsAdmin, dashboardController.users)

module.exports = router