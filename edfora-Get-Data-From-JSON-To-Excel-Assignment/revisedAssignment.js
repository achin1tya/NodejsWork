const fs =require('fs')
const xlsxpopulate=require('xlsx-populate')
const excel = require('exceljs')

// read json data 
//sync
var objStringFormat=(fs.readFileSync('./cmsConcept.js','utf8'));

//Formatting the JSON to remove ObjectId from JSON
function toObjectFormatting(objStringFormat){
    find=/((ObjectId)\(\")|(\"\))/g
    replace="\""
    objStringFormat=objStringFormat.replace(find,replace)
    return JSON.parse(objStringFormat)
}
//calling the Formatting JSON function 
var obj=toObjectFormatting(objStringFormat)
// console.log(obj[0])

//Getting appropriate data
    //get the set of courses
    var courseNameSet= new Set()
    courseNameSet.add("id")
    function getSetOfCourses(obj){
        for(var i=0;i<obj.length;i++){
            for(var j=0;j<obj[i].data.length;j++)
            {
                courseNameSet.add(obj[i].data[j].courseName)
            }
        }
    }

    //getting the column name 
    getSetOfCourses(obj)
    var courseNameArray=[...courseNameSet]
    var rowArray=[]
    rowArray.push(courseNameArray)
    function getRowArray(obj,courseNameArray){
        for(var i=0;i<obj.length;i++){
            var currentRowArray=[]
            for(var j=0;j<obj[i].data.length;j++)
            {
                currentRowArray=[]
                currentRowArray.push(obj[i]._id)
                for(var courseSetIterator=1;courseSetIterator<courseNameArray.length;courseSetIterator++)
                {
                    if(obj[i].data[j].courseName == courseNameArray[courseSetIterator]){
                        currentRowArray.push(obj[i].data[j].courseConceptName)
                    }
                    else{
                        currentRowArray.push(" ")
                    }
                }
            }
            rowArray.push(currentRowArray)
        }
    }
    getRowArray(obj,courseNameArray)
    
    // new using exceljs
    var workbook=new excel.Workbook()
    var worksheet=workbook.addWorksheet('sheet1')
    worksheet.addRows(rowArray)
    worksheet.commit
    workbook.commit
    workbook.xlsx.writeFile('ans7.xlsx')

    // //Writing data to excel file using fs
    // function createExcel(){
    //     for (var i=0;i<rowArray.length;i++)
    //     {
    //         rowArray[i].join("\t")
    //         rowArray[i].push("\n")
    //     }
    //     console.log(rowArray)
    //     fs.appendFile('ans2.xlsx',rowArray,(err)=>{
    //         console.log(err)
    //     })
    // }
    // createExcel()

    //Writing the data to excel file using exceljs
    // var workbook =new excel.Workbook()
    // workbook.xlsx.readFile('./ans.xlsx').then(function(){
    //     workbook.addWorksheet('Sheet1')
    //     var currentWorksheet=workbook.getWorksheet('Sheet1')
    //     currentWorksheet.addRow(courseNameArray).commit();
    //     currentWorksheet.addRows(rowArray).commit();
    //     workbook.commit();
    //     workbook.xlsx.writeFile('ans1.xlsx')
    // })


    //Writing the data to excel file using xlsx-populate
    // xlsxpopulate.fromBlankAsync().then(workbook=>{
    //     workbook.sheet('Sheet1').cell('A1').value('This is neat')
    //     return workbook.toFileAsync('./out.xlsx')
    // }).catch(err=>console.log(err))

    //console.log(courseNameSet)
    //console.log(courseNameSet.size)

//async
    // const fs=require('fs')
    // fs.readFile('cmsConcept.js',(error,result)=>{
    //     if(error) console.log("Cannot read data")
    //     console.log(result)
    //     var stringData=JSON.stringify(result)
    //     console.log(stringData)
    // })

// Rough
    // let jsonObjectArray=[]
    // function convertToJsonObject(rowArray,courseNameArray)
    // {
    //     for(var i=0;i<rowArray.length;i++)
    //     {
    //         for(var j=0;j<rowArray[i].length;j++)
    //         {
                
    //         }
    //     }
    // }