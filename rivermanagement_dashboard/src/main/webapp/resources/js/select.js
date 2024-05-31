

function makeOption(comboDataList){
    console.log("comboDataList", comboDataList );
    
    let optionData = comboDataList.result;
    console.log("optionData", optionData );
    console.log("optionData[0][0]", optionData[0][0] );
    
    var selectBox = document.getElementById('selectBox')
    selectBox.innerHTML = ""; // Clear previous data

    for (var i = 0; i < optionData.length; i++) {
        var option = document.createElement("option");
        option.value = optionData[i][0];
        option.text = optionData[i][0];

        selectBoxValue = selectBox.value;

         // 특정 옵션을 미리 선택된 상태로 설정
        // if (optionData[i][0] === optionData[0][0] ) {
        //     option.selected = true;
        //     selectBoxValue = optionData[0][0];
        //     console.log("makeOption selectBoxValue : ", selectBoxValue);
        // }

        selectBox.appendChild(option);
    }

}




// select박스 요소 가져오기
let selectBox = document.getElementById("selectBox");
let selectBoxValue 


function handleSelectChange() {

    var inputDate = document.getElementById("inputDate");
    var inputDateValue = inputDate.value;
    console.log("inputDateValue: ", inputDateValue);

    selectBoxValue = selectBox.value
    console.log("Selected: ", selectBoxValue);
    // 형식을 YYYYMMDD로 변경
    let occuDate = formatToYYYYMMDD(inputDateValue);
    console.log("Selected occuDate: ", occuDate);

    // waterLevelTop10Line(occuDate);
    if (selectBoxValue.includes('수위')) {
        console.log("수위");
        waterLevelTop10Line(occuDate);
    } else if (selectBoxValue.includes('유속')) {
        console.log("유속");
        flowRateTop10Line(occuDate);
    } else if (selectBoxValue.includes('유량')) {
        console.log("유량");
        streamFlowTop10Line(occuDate);
    }else{
        console.log("기타");
        selectLine(occuDate);
    }
}











function waterLevelTop10Line(occuDate){

    console.log("zz");
    console.log("occuDate : ", occuDate);
    fetch("/waterLevel", { 
        method : "POST", 
        headers: {"Content-Type": "application/json;"}, 
        credentials: "include",
        body : JSON.stringify( {
                                "serverip" : savedIP,
                                "query": "SELECT RES.* FROM ( SELECT DATA.radar_code, RAD.radar_name, DATA.hist_hour, ROUND(AVG(DATA.water_depth), 2) AS water_depth, ROUND(AVG(DATA.surface_velocity), 2) AS surface_velocity, ROUND(AVG(DATA.instant_flow), 2) AS instant_flow FROM ( SELECT HIST.radar_code , SUBSTRING(HIST.hist_time_date, 9, 2) AS hist_hour, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"') DATA LEFT OUTER JOIN TB_RADAR RAD ON RAD.radar_code = DATA.radar_code GROUP BY DATA.radar_code, RAD.radar_name, DATA.hist_hour) RES WHERE RES.radar_code IN (SELECT RC.radar_code FROM (SELECT TOP 10 radar_code, MAX(water_depth) AS water_depth FROM TB_RADAR_HIST_DETAIL WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"'  GROUP by radar_code) RC)ORDER BY RES.radar_code, RES.radar_name, RES.hist_hour"
                                } ) 
    })
    .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    .then((result) => {
        console.log("result", result );

        top10LineChart(result)

    

    }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    .catch( err => {
        // console.log("err : ", err);
    }); // 예외 발생 시 처리할 내용을 작성

}


function flowRateTop10Line(occuDate){

    console.log("occuDate");
    
    fetch("/flowRate", { 
        method : "POST", 
        headers: {"Content-Type": "application/json;"}, 
        credentials: "include",
        body : JSON.stringify( {
                                "serverip" : savedIP,
                                "query": "SELECT RES.* FROM (SELECT DATA.radar_code, RAD.radar_name, DATA.hist_hour, ROUND(AVG(DATA.water_depth), 2) AS water_depth, ROUND(AVG(DATA.surface_velocity), 2) AS surface_velocity, ROUND(AVG(DATA.instant_flow), 2) AS instant_flow FROM (SELECT HIST.radar_code, SUBSTRING(HIST.hist_time_date, 9, 2) AS hist_hour, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"' ) DATA LEFT OUTER JOIN TB_RADAR RAD ON RAD.radar_code = DATA.radar_code GROUP BY DATA.radar_code, RAD.radar_name, DATA.hist_hour) RES WHERE RES.radar_code IN (SELECT RC.radar_code FROM ( SELECT TOP 10 radar_code, MAX(surface_velocity) AS surface_velocity FROM TB_RADAR_HIST_DETAIL WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"'  GROUP by radar_code) RC)ORDER BY RES.radar_code, RES.radar_name, RES.hist_hour"
                                } ) 
    })
    .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    .then((result) => {
        console.log("result", result );

        top10LineChart(result)
    

    }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    .catch( err => {
        // console.log("err : ", err);
    }); // 예외 발생 시 처리할 내용을 작성

}


function streamFlowTop10Line(occuDate){

    fetch("/streamFlow", { 
        method : "POST", 
        headers: {"Content-Type": "application/json;"}, 
        credentials: "include",
        body : JSON.stringify( {
                                "serverip" : savedIP,
                                "query": "SELECT RES.* FROM ( SELECT DATA.radar_code, RAD.radar_name, DATA.hist_hour, ROUND(AVG(DATA.water_depth), 2) AS water_depth, ROUND(AVG(DATA.surface_velocity), 2) AS surface_velocity, ROUND(AVG(DATA.instant_flow), 2) AS instant_flow FROM (SELECT HIST.radar_code, SUBSTRING(HIST.hist_time_date, 9, 2) AS hist_hour, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"' ) DATA LEFT OUTER JOIN TB_RADAR RAD ON RAD.radar_code = DATA.radar_code GROUP BY DATA.radar_code, RAD.radar_name, DATA.hist_hour) RES WHERE RES.radar_code IN (SELECT RC.radar_code FROM (SELECT TOP 10 radar_code, MAX(instant_flow) AS instant_flow FROM TB_RADAR_HIST_DETAIL WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"'  GROUP BY radar_code ) RC ) ORDER BY RES.radar_code, RES.radar_name, RES.hist_hour"
                                } ) 
    })
    .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    .then((result) => {
        console.log("result", result );

        top10LineChart(result)

    }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    .catch( err => {
        // console.log("err : ", err);
    }); // 예외 발생 시 처리할 내용을 작성

}



function selectLine(occuDate){

    fetch("/streamFlow", { 
        method : "POST", 
        headers: {"Content-Type": "application/json;"}, 
        credentials: "include",
        body : JSON.stringify( {
                                "serverip" : savedIP,
                                "query": "SELECT RES.* FROM( SELECT DATA.radar_code, RAD.radar_name, DATA.hist_hour, ROUND(AVG(DATA.water_depth), 2) AS water_depth, ROUND(AVG(DATA.surface_velocity), 2) AS surface_velocity, ROUND(AVG(DATA.instant_flow), 2) AS instant_flow FROM (SELECT HIST.radar_code, SUBSTRING(HIST.hist_time_date, 9, 2) AS hist_hour, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"' ) DATA LEFT OUTER JOIN TB_RADAR RAD ON RAD.radar_code = DATA.radar_code GROUP BY DATA.radar_code, RAD.radar_name, DATA.hist_hour) RES WHERE RES.radar_code IN (SELECT radar_code FROM (SELECT HIST.radar_code, RAD.radar_name, MAX(HIST.hist_time_date) AS hist_time_date, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST LEFT OUTER JOIN TB_RADAR RAD ON RAD.radar_code = HIST.radar_code WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"' GROUP BY	HIST.radar_code, RAD.radar_name, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow) RC)ORDER BY RES.radar_code, RES.radar_name, RES.hist_hour"
        } ) 
    })
    .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    .then((result) => {
        console.log("result", result );

        top10LineChart(result)

    }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    .catch( err => {
        // console.log("err : ", err);
    }); // 예외 발생 시 처리할 내용을 작성

}

