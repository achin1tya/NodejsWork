
//const XMLHttpRequest=require('xmlhttprequest')
const fs = require('fs')
const jsonparser = require('JSONStream')
const excel = require('exceljs')
const xlsx = require('xlsx')
//const json2Excels=require('json2xls')
const jexport=require('jsonexport')
const json2xls = require('json2xls');
    

//let rawFileData=require('./exampleDataset.json')
//Using XMLHttpRequest()
// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

//usage:
// readTextFile("./cmsConcept", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });

// Using FS

// flatten a json object 
Object.flatten = function(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}

var flattenObject = function(ob) {
	var toReturn = {};
	
	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;
		
		if ((typeof ob[i]) == 'object') {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
};
function flattenCmsData(obj)
{
    
        childValue=Object.values(obj.courses)
        childKeys=Object.keys(obj.courses)
        console.log(childKeys)
       for(j=0;j<obj.courses.length;j++)
       {
            obj['Courses'+""+childKeys[j]+j]=childValue[j]
            //console.log(childValue[j])
       }
       delete obj
        return obj;
}

fs.readFile('./cmsConcept.js', 'utf8', (error, result) => {
    if (error) return console.log('Cannot get Data')
    console.log(typeof result)                       //raw data
    var stringData = JSON.stringify(result)           // Converting to json string
    var obj = JSON.parse(stringData)                   //converting to OBJECT
    console.log(typeof obj)                             // still returns string 
    //Replace ObjectId
    var find = /(ObjectId)\(/g;                         // regex to replace Object(
    var replace = ''
    obj = obj.replace(find, replace)

    find = /\"\)/g    
    replace="\""                                    // regex to replace ) in the document
    obj = obj.replace(find, replace)

    //console.log(obj)
    // // Parsing the string data 
    obj = JSON.parse(obj)
    var newSheetName = "myGeneratedSheet"
    //Getting all the ids

    

    // data format 
    /* obj={
        id: 
        courses:[{courseName:
                ,conceptName:}]
    }
    */

    let idArray = []
    const jsonparser = require('JSONStream')
    const excel = require('exceljs')
    let courseNameArray = new Set()
    let conceptNameArray=[]

    let newObj=[]

    obj.forEach(element => {
        var currentId=element._id;
        idArray.push(element._id)
        var dataArray=[]
        let innerObj={}
        element.data.forEach(course => {
            var currentCourseName =course.courseName
            //newObj[i].courseName=course.courseName
            var currentCoceptName=course.masterConceptName 
            //newObj[i].masterConceptName=course.masterConceptName
            
            // let requiredJson={
            //     id:currentId,
            //     currentCourseName:currentCoceptName
            // }
            innerObj={
                [currentCourseName]:currentCoceptName
            }
            console.log(innerObj)
            courseNameArray.add(course.courseName)
            conceptNameArray.push(course.masterConceptName)
            dataArray.push(innerObj)
        })
        let requiredJson={
            id:currentId,
            courses:dataArray
        }
        requiredJson = flattenCmsData(requiredJson)
        //console.log(requiredJson)
        newObj.push(requiredJson)
    });

    //using json2xls
    var xls = json2xls(newObj);

    fs.writeFileSync('data3.xlsx', xls, 'binary');
    //var workbook=new excel.Workbook()


    // courseNameArray=Array.from(courseNameArray)   // or use [...courseNameArray]
    // console.log(courseNameArray[0],conceptNameArray[0])
    // console.log(courseNameArray.length,conceptNameArray.length)
    // var xls = json2xls(newObj);
    // console.log(newObj[0])
    // console.log(xls)
    // fs.writeFileSync('data1.xlsx',xls,'binary');
    // jexport(obj,function(err,csv){
    //     if(err) console.log(error)
    //     console.log(csv)
    // })

    //using 


    //using exceljs
    // var workbook=new excel.Workbook()
    // var sheet =workbook.addWorksheet('mysheet')

    // var options = {
    //     filename: './myExcelFromJson.ods',
    //     useStyles: true,
    //     useSharedStrings: true
    // };
    //  workbook = new excel.stream.xlsx.WorkbookWriter({ stream:options })
    // var worksheet = workbook.addWorksheet()
    // worksheet.addRow(['foo', 'bar']).commit()
    // worksheet.commit()
    // workbook.commit()


    //Adding a worksheet to workbook
    //XLSX.utils.book_append_sheet(wb, ws, ws_name);

    //console.log(conceptNameArray)

    // var ws=xlsx.utils.json_to_sheet(,{skipHeader:true})




    //Using exceljs

    //Using xlsx

    //var dataTOShow=xlsx.utils.json_to_sheet()


    // var workbook=new excel.Workbook()
    // workbook.creator='Achintya'

    //Controlling workbook views 
    // workbook.views = [
    //     {
    //       x: 0, y: 0, width: 10000, height: 20000,
    //       firstSheet: 0, activeTab: 1, visibility: 'visible'
    //     }
    // ]

})


// using xls
// var workbook=xlsx.readFile('myExcelFromJson.ods')
// var sheet1=workbook.SheetNames[0]
// console.log(sheet1)
// var address_of_cell='_id'
// var worksheet=workbook.Sheets[sheet1]
// var desiredCell=worksheet[address_of_cell]
// var dataToShow=xlsx.utils.sheet_to_json(workbook.Sheets[sheet1])
// console.log(dataToShow)



//console.log(desiredCell)
// var XLSX = require('xlsx');
// function process_RS(stream/*:ReadStream*/, cb/*:(wb:Workbook)=>void*/)/*:void*/{
//   var buffers = [];
//   stream.on('data', function(data) { buffers.push(data); });
//   stream.on('end', function() {
//     var buffer = Buffer.concat(buffers);
//     var workbook = XLSX.read(buffer, {type:"buffer"});
//     console.log()
//     /* DO SOMETHING WITH workbook IN THE CALLBACK */
//     cb(workbook);
//   });
// }
// function cb(workbook){
//     console.log(workbook)
// }



//                   using exceljs

// var workbook = new excel.Workbook()

// workbook.xlsx.readFile('myExcelFromJson.ods').then(function () {
//     worksheet = workbook.getWorksheet('Sheet1')
//     console.log(worksheet.rowCount)
// }).catch(function (error) {
//     console.log(error)
// })










//ROUGH AREA
 // obj=JSON.stringify(obj)
        //obj=obj.trim()
        //obj=JSON.parse(obj)

        //console.log(obj)

        //console.log(obj[0].data[0])
       // obj = JSON && JSON.parse(dataToParse) || $.parseJSON(dataToParse);
        // console.log(dataToParse)
