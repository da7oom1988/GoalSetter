const express = require('express')
const router = express.Router()
const { getGoals,
    setGoal,
    updateGoal,
    deleteGoal } = require('../controllers/goalController')

const { protact } = require('../middleware/authMiddleware')

// router.get('/', getGoals)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

router.route('/').get(protact, getGoals).post(protact, setGoal)
router.route('/:id').put(protact, updateGoal).delete(protact, deleteGoal)


module.exports = router