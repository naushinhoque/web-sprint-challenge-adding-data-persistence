const db = require("../../data/dbConfig")

function getAllResources() {
    return db('resources').select('*')  
}

async function findById(resourceId) {
    const resource = await db('resources').where('resource_id', resourceId)
    return resource
}

async function createResource(resourceData) {
    const [resourceId] = await db('resources').insert(resourceData)
    const resource = await findById(resourceId)
    return resource[0]
}


module.exports = {
    getAllResources,
    findById,
    createResource,
}