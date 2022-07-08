let pic = document.getElementById("frame");
let month = 1;
let date = 1;
let hour = 0;
let dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let hourList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
let pos = 0;
let data = new Array(366 * 24);
let checkdata = new Array(366 * 24);

function incut(id) {
    let thisPos = id;
    console.log(thisPos);
    if (data[thisPos] == 0) {
        data[thisPos] = 1;
    }
    else {
        data[thisPos] = 0;
    }

}

function BackMore() {
    console.log("backMore");
    for (let i = 0; i < 10; i++) {
        Back();
    }
}
function FowardMore() {
    console.log("forwardMore");
    for (let i = 0; i < 10; i++) {
        Foward();
    }
}
function Back() {
    console.log("back");
    for (let i = 0; i < 8; i++) {
        pos = pos - 1;
        hour = hour - 1;
        if (hour < 0) {
            hour = 23;
            date = date - 1;
            if (date < 1) {
                month = month - 1;
                date = dateList[month - 1];
            }
        }
    }
    console.log(month, date, hour);
    show();
}
function Foward() {
    console.log("forward");
    for (let i = 0; i < 8; i++) {
        pos = pos + 1;
        hour = hour + 1;
        if (hour > 23) {
            hour = 0;
            date = date + 1;
            if (date > dateList[month - 1]) {
                date = 1;
                month = month + 1;
            }
        }
    }
    //console.log(month, date, hour);
    show();
}

function PicNum() {
    let PicList = [];
    let newmonth = month;
    let newdate = date;
    let newhour = hour;
    for (let i = 0; i < 40; i++) {
        let file = "2018-";
        if (newhour > 23) {
            newhour = 0;
            newdate += 1;
        }
        if (newdate > dateList[newmonth - 1]) {
            newdate = 1;
            newmonth += 1;
        }
        file += `${newmonth}-`;
        file += `${newdate}-`;
        file += hourList[newhour];
        file += "-00";
        PicList.push(file);
        newhour++;
    }

    return PicList;
}
function show() {
    let dataName = PicNum();
    let html = '';
    // 先處理檔案名字
    //dataName = "2018-"+`${month}`+"-"+`${date}`+"-"+`${hour}`+"-00";
    //dataName = "2018-1-1-00-00";
    let newpos = pos;
    //html += "<div>";
    for (let i = 0; i < 40; i++) {
        if (i % 8 == -1) {
            html += "<tr>";
        }
        html += "<td>";
        if (data[newpos] == 1) {
            if (checkdata[newpos] == 1) {
                html += `<img id="${newpos}" class="isCut checkCut" src="file:///C:/Users/rita5/Desktop/sis/${dataName[i]}.png" onclick="incut(this.id)">${newpos}`;
            }
            else if (checkdata[newpos] == 0) {
                html += `<img id="${newpos}" class="isCut" src="file:///C:/Users/rita5/Desktop/sis/${dataName[i]}.png" onclick="incut(this.id)">${newpos}`;
            }
            else if (checkdata[newpos] == 2) {
                html += `<img id="${newpos}" class="isCut unknown" src="file:///C:/Users/rita5/Desktop/sis/${dataName[i]}.png" onclick="incut(this.id)">${newpos}`;
            }
        }
        else {
            if (checkdata[newpos] == 2) {
                html += `<img id="${newpos}" class="unknown" src="file:///C:/Users/rita5/Desktop/sis/${dataName[i]}.png" onclick="incut(this.id)">${newpos}`;
            }
            else if (checkdata[newpos] == 1) {
                html += `<img id="${newpos}" class="checkCut" src="file:///C:/Users/rita5/Desktop/sis/${dataName[i]}.png" onclick="incut(this.id)">${newpos}`;
            }
            else {
                html += `<img id="${newpos}" src="file:///C:/Users/rita5/Desktop/sis/${dataName[i]}.png" onclick="incut(this.id)">${newpos}`;
            }
        }
        html += "</td>";
        if (i % 8 == 7 && i != 0) {
            html += "</tr>";
            console.log("------------------");
        }
        console.log(dataName[i]);
        newpos++;
    }
    pic.innerHTML = html;
}
function change() {
    document.getElementById("back").onclick = Back;
    document.getElementById("foward").onclick = Foward;
    document.getElementById("moreback").onclick = BackMore;
    document.getElementById("morefoward").onclick = FowardMore;
    document.getElementById("Fin").onclick = createCsvFile;
    for (let i = 0; i < 365 * 24; i++) {
        data[i] = 0;
    }
}

function createCsvFile() {
    var fileName = "cutOrNot.csv";//匯出的檔名
    var blob = new Blob([data], {
        type: "application/octet-stream"
    });
    var href = URL.createObjectURL(blob);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = href;
    link.download = fileName;
    link.click();
}

// 預測
document.getElementById("upload-btn").onclick = upLoad;
function upLoad() {
    var newdata = [];
    var files = document.getElementById("file-value").files;
    if (files.length) {
        var file = files[0];

        var reader = new FileReader(); //new一个FileReader实例
        reader.readAsText(file);
        reader.onload = function (f) {
            //显示文件  
            var relArr = this.result.split("\r\n");
            if (relArr.length > 1) {
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    newdata.push(values);
                }
            }
            console.log("upLoad");
            console.log(newdata[1]);
            console.log(newdata[2]);
        }
    }
    data = newdata;
}
// 標示
document.getElementById("up-btn").onclick = up;
function up() {
    var otherdata = [];
    var files = document.getElementById("file-value").files;
    if (files.length) {
        var file = files[0];

        var reader = new FileReader(); //new一个FileReader实例
        reader.readAsText(file);
        reader.onload = function (f) {
            //显示文件  
            var relArr = this.result.split("\r\n");
            if (relArr.length > 1) {
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    otherdata.push(values);
                }
            }
            console.log("up");
            console.log(otherdata[1]);
            console.log(otherdata[2]);
        }
    }
    checkdata = otherdata;
}

show()
change()