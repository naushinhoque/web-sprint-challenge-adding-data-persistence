const router = require('express').Router()
const { getAllTasks, createTask } = require('./model')
  
router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks()
        const modifiedTasks = tasks.map((task) => {
            return {
                task_description: task.task_description,
                task_notes: task.task_notes,
                task_completed: task.task_completed ? true : false,
                project_name: task.project_name,
                project_description: task.project_description
            }
        })
        res.status(200).json(modifiedTasks)
    } catch (err) {
        next(err)
    }
  });

router.post('/', (req, res, next) => {
    createTask(req.body)
        .then(task => {
            res.status(201).json(task)
        }) 
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
