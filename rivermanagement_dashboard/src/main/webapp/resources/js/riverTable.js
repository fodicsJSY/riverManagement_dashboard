

//페이지 로드시
document.addEventListener("DOMContentLoaded", function() {
    reiverMakeTable();
});


function reiverMakeTable(barData){
    let tableList = barData.result;

    // console.log("tableList", tableList );
    // console.log("테이블 생성");

    var riverTableContainer = document.getElementById("riverTableContainer");
    riverTableContainer.innerHTML = ""; // Clear previous data

    var div = document.createElement("div");
    riverTableContainer.appendChild(div);

    var gateTable = document.createElement("table");
    gateTable.className = "gateTable";
    div.appendChild(gateTable);

    var gateThead = document.createElement("thead");
    gateThead.className = "gateThead";
    gateTable.appendChild(gateThead);

    var htr = document.createElement("tr");
    gateThead.appendChild(htr);

    createCell(htr, "th", "gatetd gateLocation", "위치");
    createCell(htr, "th", "gatetd waterLevel", "수위");
    createCell(htr, "th", "gatetd flowVelocity", "유속");
    createCell(htr, "th", "gatetd flowRate", "유량");
    // createCell(htr, "th", "gatetd signal", "통신상태");

    
    var gateTbody = document.createElement("tbody");
    gateTbody.className = "gateTbody";
    gateTable.appendChild(gateTbody);

    var tr = document.createElement("tr");
    gateTbody.appendChild(tr);


    // // 데이터 삽입
    tableList.forEach(function (item) {    
        // console.log("item[0]", item[0]);
        // console.log("item[1]", item[1]);
        // console.log("item[2]", item[2]);
        // console.log("item[3]", item[3]);
        // console.log("item[4]", item[4]);
        // console.log("item[5]", item[5]);

        var tr = document.createElement("tr");
        gateTbody.appendChild(tr);
        createCell(tr, "td", "gatetd", item[1]);
        createCell(tr, "td", "gatetd", item[3]);
        createCell(tr, "td", "gatetd gate", item[4]);
        createCell(tr, "td", "gatetd", item[5]);

    });
}


// 셀 생성 함수
function createCell(row, elementType, className, content) {
    var cell = document.createElement(elementType);
    cell.className = className;
    
    // 이미지 엘리먼트인 경우에는 바로 추가
    if (typeof content === 'object' && content instanceof HTMLElement) {
        cell.appendChild(content);
    } else {
        cell.innerHTML = content;
    }

    row.appendChild(cell);
}

