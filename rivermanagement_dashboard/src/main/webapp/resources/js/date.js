    /* 전역변수 시작 */
    var forDate;
    /* 전역변수 끝 */

    /* 오늘 날짜로 초기화 시작*/
    // 페이지 로드 시 오늘 날짜로 초기화
    document.addEventListener("DOMContentLoaded", ()=> {

        // inputDate 엘리먼트 초기화
        var inputDate = document.getElementById('inputDate');
        
        // forDate 변수 초기화
        forDate = new Date(inputDate.value);

        // inputDate 엘리먼트 값 변경 이벤트 핸들러 등록
        inputDate.addEventListener('change', function() {
            sendToServer(this.value);
        });

        // 초기화 함수 호출
        today();

        // 날짜 보내기 
        sendToServer(forDate);

    });
    /* 오늘 날짜로 초기화 끝*/



    
    document.getElementById('calenderButton').addEventListener('change', function() {
        inputDate.value = this.value;
        sendToServer(this.value);
    });


    document.getElementById('leftBtn').addEventListener("click", ()=>{
        // console.log("leftBtn클릭");
        beforeOneDay();
        sendToServer();
    });


    document.getElementById('rightBtn').addEventListener("click", ()=>{
        // console.log("rightBtn클릭");
        afterOneDay();
        sendToServer();
    });


    document.getElementById('yesterdayBtn').addEventListener("click", ()=>{
        // console.log("yesterdayBtn클릭");
        yesterday();
        sendToServer();
    });


    document.getElementById('todayBtn').addEventListener("click", ()=>{
        // console.log("todayBtn클릭");
        today();
        sendToServer();
    });


    document.getElementById('beforeWeekBtn').addEventListener("click", ()=>{
        // console.log("beforeWeekBtn클릭");
        before1weekBtn();
        sendToServer();
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
    sendToServer(this.value);
});




let data;

/* 날짜 보내기 */
function sendToServer(value) {
    // 형식을 YYYYMMDD로 변경
    let occuDate = formatToYYYYMMDD(value || forDate);
    // console.log('Sending occuDate to server:', occuDate); // 콘솔에 occuDate 값 로그 출력

    fetch("/sendDate", { 
        method : "POST", 
        headers: {"Content-Type": "application/json;"}, 
        body : JSON.stringify( {"occuDate":occuDate} ) 
    })
    .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
    .then((result) => {
        // console.log("result", result );

        data = result;

        // 차트호출
        lineChart(data);
        makeTable(data);
        liveInfomation(data);
        openDounutChart(data);
        closeDounutChart(data);

        
    }) // 첫 번째 then에서 파싱한 데이터를 이용한 동작 작성
    .catch( err => {
        // console.log("err : ", err);
    }); // 예외 발생 시 처리할 내용을 작성
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
