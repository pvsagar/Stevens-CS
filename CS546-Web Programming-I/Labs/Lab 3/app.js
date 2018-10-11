

const fileData = require("./fileData");
const textMetrics = require("./textMetrics");
const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));


let lab3 = function(path,variableName){
    // creating variable name out of file name
    if (path){
        if(!variableName){
            let name = path.split('.');
            variableName = name[0];
        }
    }
    //validating file name
    if(!path && !variableName){
        console.log("File Name not Specified");
    }
    else{
        // initialize time out function
        setTimeout(() => {
            // check for existing results file
            fs.exists (`${variableName}.result.json`, (exists)  => {
                if (exists) {
                    // Displaying results file                                                                           
                    console.log(`\n${variableName}.result.json is found printing Results `);                           
                    setTimeout(() => {
                        fileData.getFileAsJSON(`${variableName}.result.json`)
                            .then((JsonData) => { 
                                console.log(`\n${variableName} results`);                       
                                console.log(JsonData);
                                console.log(`${variableName} result printing over.`);                       
                            }, (JsonData) => { 
                                console.log(JsonData); 
                            });                
                    }, 1000);
                } else {
                    // Operations on files 
                    setTimeout(() => {
                        console.log(`\n${variableName} result not found. Performing operations on the file: `+ path);  
                        // geting file content as string
                        fileData.getFileAsString(path)                                                              
                        .then((Data) => {
                            // Simplifying data
                            return textMetrics.simplify(Data)                                                     
                            .then((simplifiedData) => {
                                let simpleData = simplifiedData;
                                //Saving simplified text as text file
                                return fileData.saveStringToFile(`${variableName}.debug.txt`, simplifiedData)                                  
                                .then((simpleData) => {
                                    // computinng Metrics of file
                                    return textMetrics.createMetrics(simplifiedData)                               
                                    .then((metrics) => {  
                                        // saving data as JSON file                                          
                                        return fileData.saveJSONToFile(`${variableName}.result.json`, metrics) 
                                        .then((result) => {                                           
                                            console.log(`\n${variableName} result created. Printing result.`);  
                                            console.log(metrics);                                      
                                            console.log(`${variableName} result printing over.`);       
                                        }, (jsonError) => { console.log(jsonError); });                
                                    })
                                    // catch error if in result
                                    .catch((resultError) => {                                          
                                        console.log(resultError); 
                                    })
                                })
                                // catch error if writing file
                                .catch((textFilewriteError) => {                                       
                                    console.log(textFilewriteError); 
                                })            
                            })
                            // catch error if in simplification
                            .catch ((simplifyError) => {                                               
                                console.log(simplifyError); 
                            }) 
                        })
                        // catch error if in handling file
                        .catch((chapterError) => {                                                     
                            console.log(chapterError); 
                        })  
                    }, 1000); 
                } 
            });
        }, 0);
    }
}
// calling function
lab3("chapter1.txt");
lab3("chapter2.txt");
lab3("chapter3.txt");
lab3("chapter4.txt");
