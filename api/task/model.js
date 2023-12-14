const db = require("../../data/dbConfig")

function getAllTasks() {
    return db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')    
        .select(
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )  
}

async function findById(taskId) {
    const task = await db('tasks').where('task_id', taskId)
    return task
}

async function createTask(taskData) {
    const [taskId] = await db('tasks').insert(taskData);
    const task = await findById(taskId)
    const updateTask = {
        task_description: task[0].task_description,
        task_notes: task[0].task_notes,
        task_completed: task[0].task_completed ? true : false
    }
    return updateTask
}

module.exports = {
    getAllTasks,
    findById,
    createTask,
}