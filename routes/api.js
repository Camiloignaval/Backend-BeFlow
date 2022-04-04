const { Router } = require('express')
const { insertPay, notFound, getAll } = require('../controllers/api')
const router = Router()

// BASE /

// example
router.post('/payments', insertPay)
router.get('/payments', getAll)
router.all('*', notFound)




module.exports = router
