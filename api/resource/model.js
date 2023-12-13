// build your `Resource` model here
const db = require("../../data/dbConfig")

function getAllResources() {
    return db('resources').select('*')  
}

async function findById(resourceId) {
    const resource = await db('resources').where('resources_id', resourceId)
    return resource
}

async function createResource(resourceData) {
    const [resourceId] = await db('resources').insert(resourceData)
    const resource = await findById(resourceId)
    //Modify resource object here
    return resource
}

// async function createResource(resourceData) {
//     const [resourceId] = await db('resources').insert(resourceData);

//     return db('resources').where('resource_id', resourceId).first()
// }

module.exxports = {
    getAllResources,
    findById,
    createResource,
}