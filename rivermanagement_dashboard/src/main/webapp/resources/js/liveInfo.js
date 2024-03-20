let gateTotalCount = document.getElementById("gateTotalCount");
let gateOpenCount = document.getElementById("gateOpenCount");
let gateCloseCount = document.getElementById("gateCloseCount");
let noSignalGateCount = document.getElementById("noSignalGateCount");

let totalSignalCount = document.getElementById("totalSignalCount");
let openSignalCount = document.getElementById("openSignalCount");
let noSignalCount = document.getElementById("noSignalCount");

let gateLiveList;
let cameraCount;
let cameraIpList;


function liveInfomation(data){

    gateLiveList = data.gateLiveList;
    cameraCount = data.cameraCount;
    cameraIpList = data.cameraIpList;
    console.log("cameraIpList", cameraIpList);

    // console.log("gateLiveList", gateLiveList);
    // console.log("gateLiveList[0].gateCloseCnt", gateLiveList[0].gateCloseCnt);
    // console.log("gateLiveList[0].gateDisableCnt", gateLiveList[0].gateDisableCnt);
    // console.log("gateLiveList[0].gateOpenCnt", gateLiveList[0].gateOpenCnt);
    // console.log("gateLiveList[0].gateTotalCnt", gateLiveList[0].gateTotalCnt);
    // console.log("cameraCount", cameraCount);
    // console.log("cameraIpList", cameraIpList);

    gateTotalCount.innerHTML = `${gateLiveList[0].gateTotalCnt} 개소`;
    gateOpenCount.innerHTML = `${gateLiveList[0].gateOpenCnt} 개소`;
    gateCloseCount.innerHTML = `${gateLiveList[0].gateCloseCnt} 개소`;
    noSignalGateCount.innerHTML = `${gateLiveList[0].gateDisableCnt} 개소`;
    totalSignalCount.innerHTML = `${cameraCount} 개소`;


    let okCount = 0;
    let noCount = 0;

    // IP 주소 확인 비동기 처리
    cameraIpList.forEach((item) => {
        let ipAddr = item.ipAddr;
        checkPing(ipAddr, (status) => {
            if (status === 200) {
                okCount++;
            } else {
                noCount++;
            }

            // 모든 IP 주소 확인 완료 후 카운트 표시
            if (okCount + noCount === cameraCount) {
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