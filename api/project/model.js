// build your `Project` model here
const db = require("../../data/dbConfig")

function getAllProjects() {
    return db('projects').select('*')  
}

// function createProject(projectData) {
//     const [projectId] = db('projects').insert(projectData);

//     return db('projects').where({ project_id: projectId }).first()
// }

// function createProject(projectData) {
//     return db('projects')
//         .insert(projectData)
//         .then(([project_id]) => {
//             return 
//         })
// }

async function findById(projectId)  {
  const project = await db('projects').where('project_id', projectId)
  return project
}
async function createProject(projectData) {
  console.log(projectData)
    const [projectId] = await db('projects').insert(projectData)
    const project = await findById(projectId)
    // //Modify project object here
    const updatedProject = project.project_completed = false;
    // if (project && project.project_completed !== undefined) {
    //   project.project_completed = false; 
    // }
    return updatedProject
  }

module.exports = {
    getAllProjects,
    findById,
    createProject,
}