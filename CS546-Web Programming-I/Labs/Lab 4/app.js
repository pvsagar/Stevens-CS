

const connection = require("./mongoConnection");
const todoItems = require("./todo");

async function main() {
    // Create first task
    try{
        const firstTask = await todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
        console.log("\nFirst Task :");
        console.log(firstTask);
    }catch(e){
        console.log("Error :",e);
    }
    // Create second task
    try{
        const secondTask = await todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
        console.log("\nSecond Task :");
        console.log(secondTask);
    }catch(e){
        console.log("Error :",e);
    }
    // Query all tasks
    try{
        const allTasks = await todoItems.getAllTasks();
        console.log("\nAll Tasks :");
        console.log(allTasks);
    // Remove the first task   
        console.log(`\nRemoving First Task in the list :${allTasks[0].title}`);
        const removeTask = await todoItems.removeTask(allTasks[0]._id);
    // Query all remaining tasks
        const getRemTasks = await todoItems.getAllTasks();
        console.log("\nRemaining Tasks :");
        console.log(getRemTasks);    
    // Complete the remaining tasks
        console.log("\nCompleting Remaining Tasks in the list");
        for(i in allTasks){
            const finishedTask = await todoItems.completeTask(allTasks[i]._id);
        }
    }catch(e){
        console.log("Error :",e);
    }   
    // Log the task that has been completed with its new value.
    try{
        const getRemTasks1 = await todoItems.getAllTasks();
        console.log("\nCompleted Tasks :");
        console.log(getRemTasks1);
    }catch(e){
        console.log("Error :",e);
    }
    // Close the database connection
    const db = await connection();
    await db.serverConfig.close();    
    console.log("\nDatabase Connection Terminated");
}
main();

