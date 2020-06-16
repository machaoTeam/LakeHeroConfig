const fs = require('fs');
const xlsx = require('node-xlsx');
const { type } = require('os');

let exportJsonPath = "E:\\myProject\\LakeHeroPro\\LakeHero\\assets\\resources\\config";
let exportInterfacePath = "E:\\myProject\\LakeHeroPro\\LakeHero\\assets\\Script\\define\\interface.d.ts";

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
  //  console.log("开始解析");
  //  console.log("表名"+fileName);
  //  console.log(excelSheet[0]);
  //  console.log(excelSheet[1]);
  //  console.log(excelSheet[2][0]);
  //  console.log("解析结束");
  
  // 表头对应的key
  for(let i=2;i<excelSheet.length;i++){
    let arrItem = {};
    let dataArr = excelSheet[i];
    //组装数据 对象
    let haveData = false;
    for(let j=0;j<dataArr.length;j++){
        let key = dataName[j];
        let dataType = typeArr[j];
        if(key&&dataArr[j]){
            let itemData = filterDataByType(dataArr[j],dataType);
            haveData = true;
            arrItem[key] = itemData;
        }
    }
    if(haveData)
    JSONKey.push(arrItem);
  }
  
  //console.log(JSONKey);
  i_content += "}\n\n\n";
  interfaceContent += i_content;
  generatJSON(exportJsonPath+"\\"+fileName+'.json', JSON.stringify(JSONKey))
};

/**
 * 过滤不同类型的数据
 */
function filterDataByType(data,type){
    if(!data)return null;
    let reData;
    switch(type){
        case "number":
        case "string":
            reData = data;
        break;
        case "number[]":
            data = data.toString();
            reData = data.split(",");
            //把字符串转换成数字
            for(let i=0;i<reData.length;i++){
              if(reData[i].indexOf(".")<0){
                reData[i] = parseInt(reData[i]);
              }else{
                reData[i] = parseFloat(reData[i]);
              }
            }
        break;
        case "number[][]":
            data = data.toString();
            let arr1 = data.split("|");
            reData = [];
            for(let i=0;i<arr1.length;i++){
              let spData = arr1[i].split(",");
              //字符串转换成数字
              for(let j=0;j<spData.length;j++){
                if(spData[j].indexOf(".")<0){
                  spData[j] = parseInt(spData[j]);
                }else{
                  spData[j] = parseFloat(spData[j]);
                }
              }
              //塞入数组中
              if(spData&&spData.length>0)
              reData.push(spData)
            }
        break;
        default:
            reData = data;
        break;
    }
    return reData;
}


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



