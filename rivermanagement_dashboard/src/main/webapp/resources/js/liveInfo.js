let gateTotalCount = document.getElementById("gateTotalCount");
let gateOpenCount = document.getElementById("gateOpenCount");
let gateCloseCount = document.getElementById("gateCloseCount");
let noSignalGateCount = document.getElementById("noSignalGateCount");

let totalSignalCount = document.getElementById("totalSignalCount");
let openSignalCount = document.getElementById("openSignalCount");
let noSignalCount = document.getElementById("noSignalCount");

let cameraCount;
let cameraIpList_arry;
let raderLiveList_arry;


// function liveInformation(cameraCountResp, cameraIpListResp raderLiveListResp){
function liveInformation(cameraCountResp, cameraIpListResp){
    
    cameraCount = cameraCountResp.result;
    cameraIpList_arry = cameraIpListResp.result;
    // raderLiveList_arry = raderLiveListResp.result;
    console.log("cameraCount", cameraCount);
    console.log("cameraIpList_arry", cameraIpList_arry);
    // console.log("raderLiveList_arry", raderLiveList_arry);





    totalSignalCount.innerHTML = `${cameraCount} 개소`;


    let okCount = 0;
    let noCount = 0;

    // IP 주소 확인 비동기 처리
    cameraIpList_arry.forEach((item) => {
        let ipAddr = item;
        checkPing(ipAddr, (status) => {
            if (status === 200) {
                okCount++;
            } else {
                noCount++;
            }
            // console.log("okCount", okCount);
            // console.log("noCount", noCount);
            // console.log("okCount + noCount", okCount + noCount);

            // 모든 IP 주소 확인 완료 후 카운트 표시
            if (okCount + noCount == cameraCount) {
                openSignalCount.innerHTML = `${okCount} CH`;
                noSignalCount.innerHTML = `${noCount} CH`;
            }
        });
    });
}

    

function checkPing(ipAddr, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", ipAddr, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.status);
        }
    };
    xhr.send();
}