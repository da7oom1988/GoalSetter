const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//@desc      GET GOALS
//@route     GET /api/goals
//@access    Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

//@desc      SET GOAL
//@route     POST /api/goals
//@access    Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

//@desc      UPDATE GOAL
//@route     PUT /api/goals/:id
//@access    Private
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('Not authoraized')
    }

    //make  sure it is same user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authoraized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

//@desc      DELETE GOAL
//@route     DELETE /api/goals/:id
//@access    Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('Not authoraized')
    }

    //make  sure it is same user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authoraized')
    }

    //const deletedGoal =  await Goal.findByIdAndDelete(req.params.id)
    await goal.remove()

    res.status(200).json(req.params.id)

})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}