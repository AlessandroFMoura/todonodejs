class CreateTaskService {

    // DI - Injeção de Dependencia
    constructor({ taskModel, taskFactory }) {
        this.taskModel = taskModel
        this.taskFactory = taskFactory
    }

    // "S"olid = single responsability
    async execute({ title, description }) {
        const model = this.taskFactory({ title, description })
        await this.taskModel.create(model)
    }
}

module.exports = CreateTaskService