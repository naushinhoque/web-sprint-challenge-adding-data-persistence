const router = require('express').Router()
const { createProject, getAllProjects } = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await getAllProjects()
        const modifiedProjects = projects.map((project) => {
            return {
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: project.project_completed ? true : false,
                // createdAt: Date.now(),
                // code: project.projectName.length >= 4 ? "xxxx" : "123" 
            }
        }
         )
        res.status(200).json(modifiedProjects)
    } catch (err) {
        next(err)
    }
})

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