// build your `/api/resources` router here
const router = require('express').Router()
const { getAllResources, createResource } = require('./model')
  
router.get('/', async (req, res, next) => {
    try {
        const resources = await getAllResources()
        res.status(200).json(resources)
    } catch (err) {
        next(err)
    }
  });

//   router.post('/', async (req, res, next) => {
//     try {
//         const newResource = await createResource(req.body)
//         res.status(201).json(newResource)
//     } catch (err) {
//         next(err)
//     }
//   });
router.get('/', (req, res, next) => {
    createResource(req.body)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the resource router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
