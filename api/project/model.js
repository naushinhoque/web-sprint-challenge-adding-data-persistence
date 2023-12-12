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
async function createProject(projectData) {
    return db('projects')
      .insert(projectData)
      .then(([projectId]) => 
        db('projects')
          .where({ project_id: projectId })
          .first()
      );
  }

module.exports = {
    getAllProjects,
    createProject,
}