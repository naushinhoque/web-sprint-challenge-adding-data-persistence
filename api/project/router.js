// build your `/api/projects` router here
const router = require('express').Router()
const { createProject, findById, getAllProjects } = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await getAllProjects()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/:project_id', async (req, res, next) => {
    try {
        const project = await findById(req.params.project_id)
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
})
// router.post('/', async (req, res, next) => {
//     try {
//         const newProject = await createProject(req.body)
//         res.status(201).json(newProject)
//         res.send(newProject) 
//     } catch (err) {
//         next(err)
//     }
// })
router.post('/', (req, res, next) => {
      createProject(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})



router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router