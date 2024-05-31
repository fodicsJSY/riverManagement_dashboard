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



    fetchData(savedIP, occuDate);


    // // fetchData2 함수를 호출하고 결과를 처리하는 예제
    (async () => {
        try {
            await 
            // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
        } catch (error) {
            console.error('Error occurred:', error);
        }
    })();





}





// 라디오 버튼 요소 가져오기
const waterLevelRadio = document.getElementById("waterLevel");
const flowRateRadio = document.getElementById("flowRate");
const streamFlowRadio = document.getElementById("streamFlow");

let radioSelected = 0;


// select박스 요소 가져오기
let selectBox = document.getElementById("selectBox");


async function fetchData(savedIP, occuDate) {


    var DBip = savedIP;
    console.log('fetchData DBip:', DBip); // 콘솔에 occuDate 값 로그 출력

    console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력



    try {
            

        // const result1 = await fetch("/liveBarData", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json;" },
        //         body: JSON.stringify({
        //             "serverip" : savedIP,
        //             "query": "SELECT HIST.radar_code, MAX(HIST.hist_time_date) AS hist_time_date, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+occuDate+"' GROUP BY HIST.radar_code, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow"

        //         })
        //     });

        //     if (!result1.ok) {
        //         throw new Error('Network response was not ok');
        //     }

        //     const liveBarData = await result1.json();
        //     console.log("sendTableQuery", liveBarData);
        //     console.log("result1", result1);

            // waterLevelChart(result);



        //실시간 bar
        fetch("/liveBarData", { 
            method : "POST", 
            headers: {"Content-Type": "application/json;"}, 
            credentials: "include",
            body : JSON.stringify( {
                                    "serverip" : savedIP,
                                    "query": "SELECT HIST.radar_code, MAX(HIST.hist_time_date) AS hist_time_date, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow FROM dbo.TB_RADAR_HIST_DETAIL HIST WHERE 1 = 1 AND SUBSTRING(hist_time_date, 1, 8) = '"+occuDate+"' GROUP BY HIST.radar_code, HIST.water_depth, HIST.surface_velocity, HIST.instant_flow"
                                    } ) 
        })
        .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
        .then((result) => {
            console.log("result", result );




            // data = result;
            // console.log("data : ", data);
            
            
        }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
        .catch( err => {
            // console.log("err : ", err);
        }); // 예외 발생 시 처리할 내용을 작성







            // 테이블 호출
            // const result1 = await fetch("/sendTableQuery", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json;" },
            //     body: JSON.stringify({
            //         "serverip": DBip,
            //         "query": ""
            //     })
            // });

            // if (!result1.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // const sendTableQuery = await result1.json();
            // // console.log("sendTableQuery", sendTableQuery);
            // // console.log("result1", result1);

            // makeTable(sendTableQuery); 



            //쿼리 수정해야 함.
            // // 개문횟수
            // const result2 = await fetch("/openGateList", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json;" },
            //     body: JSON.stringify({
            //         "serverip": "DBip",
            //         "query": ""
            //     })
            // });

            // if (!result2.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // const openGateList = await result2.json();
            // console.log("Some other endpoint", result2);



            //쿼리 수정해야 함.
            // // 폐문횟수
            // const result3 = await fetch("/closeGateList", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json;" },
            //     body: JSON.stringify({
            //         "serverip": "DBip",
            //         "query": ""
            //     })
            // });

            // if (!result3.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // const closeGateList = await result3.json();
            // console.log("Some other endpoint", result3);



            // 라디오 버튼 상태 확인
            if (waterLevelRadio.checked) {
                radioSelected = 1;
                console.log("수위가 선택되었습니다.");
            } else if (flowRateRadio.checked) {
                radioSelected = 2;
                console.log("유속이 선택되었습니다.");
            } else{
                radioSelected = 3;
                console.log("유량이 선택되었습니다.");
            } 

            // select박스 상태 확인
            let selectBoxValue = selectBox.value



            // 쿼리 수정해야 함.
            // 라인차트
            const result4 = await fetch("/sendLineQuery", {
                method: "POST",
                headers: { "Content-Type": "application/json;" },
                body: JSON.stringify({
                        "radioSelected" : radioSelected,
                        "selectBoxValue" : selectBoxValue,
            //         "serverip": "DBip",
            //         "query": ""
                })
            });

        if (!result4.ok) {
            throw new Error('Network response was not ok');
        }

        const sendLineQuery = await result4.json();
        console.log("Some other endpoint", sendLineQuery);





        // 이와 같이 필요한 만큼 fetch 호출을 추가할 수 있습니다.





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





