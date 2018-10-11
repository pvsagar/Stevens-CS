

let fs = require("fs");
//File validation
function checkIsProperFile(path) {
    if (!path){
        throw `File Name not specified`
    }
}
// exportin the required modules
module.exports ={
    // get file data as string
    async getFileAsString(path){
        return new Promise((resolve, reject) => {                                  
            checkIsProperFile(path);
            fs.readFile(path, "utf-8", (err, data) => {           
                if (err) {                                                  
                    reject(`\n${path} doesn't exists in the directory`);            
                    return;                                            
                } 
                resolve(data);                                                
            });
        });
    },
    
    async getFileAsJSON(path){
        // get file data as JSON
        return new Promise((resolve, reject) => {                           
            checkIsProperFile(path);
            fs.readFile(path, "utf-8", (err, data) => {        
                if (err) {                                     
                    reject(`\n${path} doesn't exists in the directory`);         
                } 
                try {
                    let jsonData = JSON.parse(data);                     
                    resolve(jsonData);                                   
                } catch (parsing_error) {
                    reject("There was an parsing error");   
                }            
            });
        });
    },

    async saveStringToFile(path, text){
        // save string as text file
        return new Promise((resolve, reject) => {                                
            checkIsProperFile(path);
            if(!text)                                                    
                throw "No writable data in text file provided";                      
            fs.writeFile(path, text, (err, text) => {       
                if (err) {                                                 
                    reject(err);                                            
                    return;                                                        
                } 
                console.log(`\nSimplified Text Data saved as ${path} in the current working directory`);                    
                resolve(text);                                                
            });
        });
    },
    async saveJSONToFile(path, obj){
        //save data as a JSON file
        return new Promise((resolve, reject) => {                                  
            checkIsProperFile(path);
            if (!obj)                                             
                throw "No writable data in text file provided";                 
            fs.writeFile(path, JSON.stringify(obj, null, 4), (err, obj) => {  
                if (err) {                                                  
                    reject(err);                                            
                    return;                                                  
                }
                console.log(`\nMetrics JSON Data saved as ${path} in the current working directory`);   
                resolve(obj);       
            });
        });   
    }
}
