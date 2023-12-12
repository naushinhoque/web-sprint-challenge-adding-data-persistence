// build your `Resource` model here
const db = require("../../data/dbConfig")

function getAllResources() {
    return db('resources').select('*')  
}

async function createResource(resourceData) {
    const [resourceId] = await db('resources').insert(resourceData);

    return db('resources').where({ id: resourceId }).first()
}

module.exxports = {
    getAllResources,
    createResource,
}