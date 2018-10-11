const uuid = require("uuid");
const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;


module.exports = {
    // Creates Tasks
    async createTask(title, description){
        if (!title) throw "You must provide a Title for your task";
        if (description === undefined) throw "You must provide at least one task.";
        const taskCollection = await todoItems();
        let newTask = {
            _id: uuid.v4(),
            title: title,
            description: description,
            completed: false,
            completedAt: null
        };
        const insertInfo = await taskCollection.insertOne(newTask);
        if (insertInfo.insertedCount === 0) throw "Could not add Task";
        const newId = insertInfo.insertedId;
        const task = await this.getTask(newId);
        return task;
    },
    // Get all tasks
    async getAllTasks(){
        const taskCollection = await todoItems();
        const tasks = await taskCollection.find({}).toArray();
        return tasks;
    },
    // Given an id, this function will get task from the database
    async getTask(id){
        if (!id) throw "You must provide an id to search for";
        const taskCollection = await todoItems();
        const tasko = await taskCollection.findOne({ _id: id });
        if (tasko === null) throw "No task with that id";
        return tasko;
        },
    // Modify the task in the database. It will set completed to true and completedAt to the current time
    async completeTask(taskId){
        if (!taskId) throw "You must provide an id to search for";
        const taskCollection = await todoItems();
        const updatedTask = await taskCollection.update(
                                            { _id: taskId },
                                            { $set: { "completed": true,
                                                    "completedAt": new Date() } }
                                            )
        return updatedTask;
    },
    // Remove the task from the database.
    async removeTask(id){
        if (!id) throw "You must provide an id to search for";
        const taskCollection = await todoItems();
        const deletionInfo = await taskCollection.removeOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete task with id of ${id}`;
        }
    }
}

