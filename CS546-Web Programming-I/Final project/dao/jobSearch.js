
//logic for filtering using the checkboxes with multiple select that is tech and company.
let filterController = {
    
    applyFilter: async function(companyList, techArray) {
        let resultArray=[];
        for(let i=0;i<companyList.length;i++)
        {
            
                        if(techArray==companyList[i].name)
                            resultArray.push(companyList[i]);
                    
                
            
        }
        resultArray = resultArray.filter((x, i, a) => a.indexOf(x) == i)
        console.log(resultArray);
        return resultArray;
    }
};

module.exports = filterController;