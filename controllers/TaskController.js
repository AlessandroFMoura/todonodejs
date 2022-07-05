const Task = require('../models/Task');

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const { body: { title, description } } = req

        const task = {
            title,
            description,
            done: false
        }
        await Task.create(task)

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

        const task = {
            title: title,
            description: description,
        }

        await Task.update(task, { where: {id: id} });

        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res) {
        const { body: { id, done } } = req

        const task = {
            done: done === '0'? true : false
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