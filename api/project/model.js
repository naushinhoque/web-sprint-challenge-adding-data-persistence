// build your `Project` model here
const db = require("../../data/dbConfig")

function getAllProjects() {
    return db('projects').select('*')  
}

async function createProject(projectData) {
    const [projectId] = await db('projects').insert(projectData);

    return db('projects').where({ id: projectId }).first()
}

module.exxports = {
    getAllProjects,
    createProject,
}