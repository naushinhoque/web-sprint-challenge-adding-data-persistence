const db = require("../../data/dbConfig")

function getAllTasks() {
    return db('tasks').select('*')  
}

async function findById(taskId) {
    const task = await db('tasks').where('task_id', taskId)
    return task
}

async function createTask(taskData) {
    const [taskId] = await db('tasks').insert(taskData);
    const task = await findById(taskId)
    return task[0]
}

module.exports = {
    getAllTasks,
    findById,
    createTask,
}