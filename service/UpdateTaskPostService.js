class UpdateTaskPostService {

    constructor({ taskModel, updateFactory }) {
        this.taskModel = taskModel
        this.updateFactory= updateFactory
        
    }

    async execute({ title, description, id }) {
        const model = this.updateFactory({ title, description, id })
        await this.taskModel.update(model, { where: { id: id } })
    }
}

module.exports =  UpdateTaskPostService