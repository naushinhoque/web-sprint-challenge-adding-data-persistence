const db = require("../../data/dbConfig")

function getAllProjects() {
    return db('projects').select('*')  
}

async function findById(projectId)  {
  const project = await db('projects').where('project_id', projectId)
  return project
}
async function createProject(projectData) {
  // console.log(projectData)
    const [projectId] = await db('projects').insert(projectData)
    const project = await findById(projectId)
    // console.log(projectId, 'projectId')
    // console.log(project[0])
    // //Modify project object here
    // const updatedProject = {
    //   ...project,
    //   // project_completed: false,
    // }
    // if (project && project.project_completed !== undefined) {
    //   project.project_completed = false; 
    // }
    return project[0]
  }

module.exports = {
    getAllProjects,
    findById,
    createProject,
}