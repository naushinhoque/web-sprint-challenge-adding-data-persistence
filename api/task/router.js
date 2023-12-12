// build your `/api/tasks` router here
const router = require('express').Router()
const taskModel = require('./model')

router.post('/', async (req, res, next) => {
    try {
        const newTask = await taskModel.createTask(req.body)
        res.status(201).json(newTask)
    } catch (err) {
        next(err)
    }
  });
  
router.get('/', async (req, res, next) => {
    try {
        const tasks = await taskModel.getAllTasks()
        res.status(200).json(tasks)
    } catch (err) {
        next(err)
    }
  });

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router