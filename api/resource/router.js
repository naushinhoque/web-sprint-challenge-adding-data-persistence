// build your `/api/resources` router here
const router = require('express').Router()
const resourceModel = require('./model')
  
router.get('/', async (req, res, next) => {
    try {
        const resources = await resourceModel.getAllResources()
        res.status(200).json(resources)
    } catch (err) {
        next(err)
    }
  });

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the resource router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
