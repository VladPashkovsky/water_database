const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware')
const waterController = require('../controllers/water-controller')

router.get('/', authMiddleware, waterController.getAllWaters)
router.get('/:id', authMiddleware, waterController.getWaterById)
router.post('/add', authMiddleware, waterController.addWater)
router.put('/edit/:id', authMiddleware, waterController.editWater)
router.delete('/remove/:id', authMiddleware, waterController.removeWater)

module.exports = router
