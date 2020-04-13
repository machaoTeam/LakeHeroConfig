const fs = require('fs');
const xlsx = require('node-xlsx')

let exportJsonPath = "E:\\myProject\\LakeHero\\assets\\resources\\config";
let exportInterfacePath = "E:\\myProject\\LakeHero\\assets\\Script\\define\\interface.d.ts";

function handelExcel(fileName) {
  let excelData = xlsx.parse('./excel/'+fileName+'.xlsx');
  // excel的第一个sheet
  const excelSheet = excelData[0].data;
  // 表头
  let typeArr = excelSheet[0];
  let dataName = excelSheet[1];
  let JSONKey = [];
  //interface 内容
  let i_content = "interface res_"+fileName+"{\n";
  //组装iterface
  for(let i=0;i<dataName.length;i++){
      let name = dataName[i];
      let type = typeArr[i]
      i_content += "\t"+name+"?:"+type+";\n";
  }
  
  // 表头对应的key
  for(let i=2;i<excelSheet.length;i++){
    let arrItem = {};
    let dataArr = excelSheet[i];
    //组装数据 对象
    for(let j=0;j<dataArr.length;j++){
        let key = dataName[j];
        if(key&&dataArr[j]){
            arrItem[key] = dataArr[j];
        }
    }
    JSONKey.push(arrItem);
  }
  
  //console.log(JSONKey);
  i_content += "}\n\n\n";
  interfaceContent += i_content;
  generatJSON(exportJsonPath+"\\"+fileName+'.json', JSON.stringify(JSONKey))
};


/**
 * 生成JSON文件
 * @param {*} fileName 
 * @param {*} data 
 */
function generatJSON(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', function (err) {
    if (err) {
      console.log(fileName+'转换errr');
    } else {
      console.log(fileName+'转换success');
    }
  })
}


/**
 * 写类型声明文件
 * @param {*} fileName 
 * @param {*} data 
 */
function generatInterface(data) {
  fs.writeFile(exportInterfacePath, data, 'utf-8', function (err) {
    if (err) {
      console.log('interface生成错误');
    } else {
      console.log('interface生成成功');
    }
  })
}

/**
 * 读取所有文件
 */
function readAllFile(){
    const files = fs.readdirSync(`./excel`);
    files.forEach((item,index)=>{
        if(!(/^\~/.test(item))){
            let fileName = item.split(`.`)[0];
            handelExcel(fileName);
        }
    })
}
let interfaceContent = "";
readAllFile();
generatInterface(interfaceContent);



