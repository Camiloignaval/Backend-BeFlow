const { Router } = require('express')
const { insertPay, notFound, getAll, getOne, deleteOne, updateOne } = require('../controllers/api')
const { contadorPeticiones } = require('../middlewares/cantidadPeticiones')
const router = Router()

// BASE /
// contador peticiones
router.use(contadorPeticiones)

// example
router.post('/payments', insertPay)
router.get('/payments/:id', getOne)
router.delete('/payments/:id', deleteOne)
router.put('/payments/:id', updateOne)
router.get('/payments', getAll)
router.all('*', notFound)




module.exports = router
