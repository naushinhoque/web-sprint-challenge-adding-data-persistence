const db = require("../../data/dbConfig")

function getAllProjects() {
    return db('projects').select('*')  
}

async function findById(projectId)  {
  const project = await db('projects').where('project_id', projectId)
  return project
}
async function createProject(projectData) {
    const [projectId] = await db('projects').insert(projectData)
    const project = await findById(projectId)
    const updatedProject = {
      project_name: project[0].project_name,
      project_description: project[0].project_description,
      project_completed: project[0].project_completed ? true : false
    }
    return updatedProject
  }

module.exports = {
    getAllProjects,
    findById,
    createProject,
}