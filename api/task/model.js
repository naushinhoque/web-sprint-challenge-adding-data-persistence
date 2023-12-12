// build your `Task` model here
const db = require("../../data/dbConfig")

function getAllTasks() {
    return db('tasks').select('*')  
}

async function createTask(taskData) {
    const [taskId] = await db('tasks').insert(taskData);

    return db('tasks').where({ id: taskId }).first()
}

module.exxports = {
    getAllTasks,
    createTask,
}