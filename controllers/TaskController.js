const Task = require('../models/Task');
const CreateTaskService = require('../service/CreateTaskService');
const TaskFactory = require('../factory/TaskFactory')
const UpdateTaskPostService = require('../service/UpdateTaskPostService')

class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const { body: { title, description } } = req

        const taskFactory = TaskFactory()
        const service = new CreateTaskService({ taskFactory, taskModel: Task })

        await service.execute({ title, description })

        res.redirect('/tasks')
    };

    static async removeTask(req, res) {
        const { body: { id } } = req;

        await Task.destroy({ where: { id: id } });

        res.redirect('/tasks')
    }

    static async updateTask(req, res) {

        const id = req.params.id

        const task = await Task.findOne({ where: { id: id }, raw: true })

        res.render('tasks/edit', { task })

    }

    static async updateTaskPost(req, res) {
        const { body: { title, description, id } } = req

        const taskFactory = TaskFactory()
        const service = new UpdateTaskPostService({ updateFactory: taskFactory, taskModel: Task })
       
        await service.execute({ title, description, id })
        
        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res) {
        const { body: { id, done } } = req

        const task = {
            done: done === '0' ? true : false
        }
        await Task.update(task, { where: { id: id } })

        res.redirect('/tasks')
    }

    static async viewTask(req, res) {
        const id = req.params.id;

        const task = await Task.findOne({ where: { id: id }, raw: true })

        res.render('tasks/view', { task })

    }

    static async showTasks(req, res) {

        const tasks = await Task.findAll({ raw: true })

        res.render('tasks/all', { tasks })
    };

}

module.exports = TaskController