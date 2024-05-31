    /* 전역변수 시작 */
    var forDate;
    /* 전역변수 끝 */

    /* 오늘 날짜로 초기화 시작*/
    // 페이지 로드 시 오늘 날짜로 초기화
    document.addEventListener("DOMContentLoaded", ()=> {
        console.log("시작");
        initialize();
    });
    /* 오늘 날짜로 초기화 끝*/



    
    document.getElementById('calenderButton').addEventListener('change', function() {
        inputDate.value = this.value;
        sendToServer(savedIP, this.value);
    });


    document.getElementById('leftBtn').addEventListener("click", ()=>{
        // console.log("leftBtn클릭");
        beforeOneDay();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('rightBtn').addEventListener("click", ()=>{
        // console.log("rightBtn클릭");
        afterOneDay();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('yesterdayBtn').addEventListener("click", ()=>{
        // console.log("yesterdayBtn클릭");
        yesterday();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('todayBtn').addEventListener("click", ()=>{
        // console.log("todayBtn클릭");
        today();
        sendToServer(savedIP, forDate);
    });


    document.getElementById('beforeWeekBtn').addEventListener("click", ()=>{
        // console.log("beforeWeekBtn클릭");
        before1weekBtn();
        sendToServer(savedIP, forDate);
    });




// 하루 전으로 초기화 
function beforeOneDay(){
    var inputDate = new Date(document.getElementById('inputDate').value);
    inputDate.setDate(inputDate.getDate() - 1);
    var formattedDate = inputDate.toISOString().substring(0, 10);
    document.getElementById('inputDate').value = formattedDate;
    forDate = formattedDate; // forDate 업데이트
    // console.log("하루 전 : ", forDate);
}


// 다음 날짜로 초기화
function afterOneDay(){
    var inputDate = new Date(document.getElementById('inputDate').value);
    inputDate.setDate(inputDate.getDate() + 1);
    var formattedDate = inputDate.toISOString().substring(0, 10);
    document.getElementById('inputDate').value = formattedDate;
    forDate = formattedDate; // forDate 초기화
    // console.log("다음 날짜 : ", forDate);
}


// 어제 날짜로 초기화
function yesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제의 날짜로 설정
    var formattedDate = yesterday.toISOString().substring(0, 10);
    inputDate.value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("어제 날짜 : ", forDate);
}


// 오늘 날짜로 초기화
function today(){
    var today = new Date();
    var formattedDate = today.toISOString().substring(0, 10);
    inputDate.value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("오늘날짜 : ", forDate);
}

// 1주 전으로 초기화
function before1weekBtn(){
    var beforeOneWeek = new Date();
    beforeOneWeek.setDate(beforeOneWeek.getDate() - 7); 
    var formattedDate = beforeOneWeek.toISOString().substring(0, 10);
    document.getElementById('inputDate').value = formattedDate;
    // console.log("formattedDate : ", formattedDate);
    forDate = formattedDate; // forDate 초기화
    // console.log("1주전 날짜 : ", forDate);
}


// input태그 날짜 직접 입력
inputDate.addEventListener('keyup', function() {
    // console.log("inputDate 변경됨 : ", this.value);
    sendToServer(savedIP, this.value);
});




let data;

/* 날짜 보내기 */
function sendToServer(savedIP, value) {
    // 형식을 YYYYMMDD로 변경
    let occuDate = formatToYYYYMMDD(value || forDate);
    console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력
    console.log('sendToServer savedIP:', savedIP); // 콘솔에 savedIP 값 로그 출력

    // fetchData 함수를 호출하고 결과를 처리하는 예제
    (async () => {
        try {
            console.log('sendToServer savedIP : ', savedIP); // 콘솔에 savedIP 값 로그 출력
            await fetchData(savedIP, occuDate);
            
            // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
        } catch (error) {
            console.error('Error occurred:', error);
        }
    })();

}






// 비동기 데이터 가져오기
async function fetchData(savedIP, occuDate) {

    var DBip = savedIP;
    console.log('fetchData DBip:', DBip); // 콘솔에 occuDate 값 로그 출력

    console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력


    try {


        // 막대차트
        const result1 = await fetch("/liveBarData", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
                "query": "SELECT HIST.radar_code, RAD.radar_name, MAX(HIST.hist_time_date) AS hist_time_date, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST LEFT OUTER JOIN TB_RADAR RAD ON HIST.radar_code = RAD.radar_code WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+ occuDate +"' GROUP BY HIST.radar_code, RAD.radar_name, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow",
                "id":"",
                "pw":""
            })
        });

        if (!result1.ok) {
            throw new Error('Network response was not ok');
        }

        const barData = await result1.json();
        console.log("barData", barData);
        console.log("result1", result1);

        waterLevel(barData);
        flowRate(barData);
        streamFlow(barData);
        reiverMakeTable(barData)



        // 라인차트
        const result2 = await fetch("/comboData", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                "serverip": savedIP,
                "query": "SELECT '수위 TOP 10', '' UNION ALL SELECT '유속 TOP 10', '' UNION ALL SELECT '유량 TOP 10', '' UNION ALL SELECT radar_name , radar_code FROM TB_RADAR",
                "id":"",
                "pw":""
            })
        });

        if (!result2.ok) {
            throw new Error('Network response was not ok');
        }

        const comboDataList = await result2.json();
        console.log("comboDataList", comboDataList);
        console.log("result2", result2);
        
        makeOption(comboDataList);
        
        selectBoxValue = selectBox.value

        console.log("Selected: ", selectBoxValue);
        
        console.log("result2 occuDate", occuDate);
        handleSelectChange(occuDate);




    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }



}














/* 날짜 형식화 함수 */
/* YYYYMMDD 형식으로 변환하는 함수 */
/* YYYY-MM-DD 형식으로 변환하는 함수 */
function formatToYYYYMMDD(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
}



