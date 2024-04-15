var settingButton = document.getElementById("settingButton");

settingButton.addEventListener("click", ()=>{
    console.log("클릭");

    getDBIP();

});




// IP명 받기
async function getDBIP() {
    const { value: ipAddr } = await Swal.fire({
        title: "IP를 입력해주세요.",
        input: "text",
        inputLabel: "IP를 입력해주세요.",
        inputValue: savedIP, // 이전에 저장된 IP를 기본값으로 설정
        showCancelButton: true,
        inputValidator: (value) => {
            // console.log("value : ", value);
            if (!value) {
                return getDBIP();
            }
        }
    });

    // 사용자가 새로운 IP를 입력했을 경우에만 저장
    if (ipAddr && ipAddr !== savedIP) {
        saveIPToLocalStorage(ipAddr);
    }
    initialize(ipAddr);
    // console.log("ipAddr: ", ipAddr);
    return ipAddr;
}

// 로컬 스토리지에서 IP 주소를 가져오는 함수
function getIPFromLocalStorage() {
    return localStorage.getItem("dbIP");
}



// inputDate 엘리먼트 초기화
var inputDate = document.getElementById('inputDate');
let savedIP;

// 초기화할 때 로컬 스토리지에서 IP를 가져와 사용
async function initialize() {
    savedIP = getIPFromLocalStorage();
    // if (savedIP) {
    //     await ipFetch(savedIP);
    // }
    console.log("initialize savedIP", savedIP);

    
    // forDate 변수 초기화
    forDate = new Date(inputDate.value);
    today();
    // inputDate 엘리먼트 값 변경 이벤트 핸들러 등록
    inputDate.addEventListener('change', function() {
        sendToServer(savedIP, this.value);
    });

    // 날짜 보내기 
    console.log("날짜보내기");

    (async () => {
        try {
            sendToServer(savedIP, forDate);
            // fetchData 함수에서 반환한 데이터를 이용하여 원하는 작업 수행
        } catch (error) {
            console.error('Error occurred:', error);
        }
    })();
    
}


// 사용자가 입력한 IP 주소를 로컬 스토리지에 저장하는 함수
function saveIPToLocalStorage(ipAddr) {
    localStorage.setItem("dbIP", ipAddr);
}


// 클릭 이벤트 리스너 내부에서 IP를 받아오는 함수 호출 시 인자로 IP 주소 전달
// settingButton.addEventListener("click", () => {
//     console.log("클릭");
//     initialize();
// });


// let dataBaseIP;

// // 비동기로 IP 받아오기
// async function ipFetch(savedIP){
//     const ipAddr = savedIP || await getDBIP();
//     // const ipAddr = await getDBIP();
//     console.log("ipAddr2: ", ipAddr);


//     if (ipAddr) {
//         fetch("ipAddrFetch", { 
//             method : "POST", 
//             headers: {"Content-Type": "application/json"}, 
//             body : JSON.stringify( {"ipAddr":ipAddr} ) 
//         })
//         .then(resp => resp.json()) // 요청에 대한 응답 객체(response)를 필요한 형태로 파싱
//         .then((result) => {
//             // console.log("ipAddr result : ", result);
//             // console.log("여기");
//             // savedIP = result.ipAddr;
//             // console.log("savedIP : ", savedIP);
//             // sendToServer(savedIP, forDate);


//         }).catch( err => {
//             // console.log("err : ", err);
//             Swal.fire("데이터를 불러올 수 없습니다.");
//         }); // 예외 발생 시 처리할 내용을 작성

//     }
// }