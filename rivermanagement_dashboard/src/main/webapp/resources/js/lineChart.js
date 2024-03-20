let daliyCountList;
let dateDataChart; 

function lineChart(data) {
    daliyCountList = data.daliyCountList;

    // console.log("daliyCountList", daliyCountList);
    // console.log("일별 구동 차트");

    // 이전에 있던 차트 객체가 있으면 삭제
    if (dateDataChart || daliyCountList == null) {
        dateDataChart.dispose();
    }



    dateDataChart = echarts.init(document.getElementById('dateData'));



    // 카메라 이름 목록 추출
    const cameras = [...new Set(daliyCountList.map(entry => entry.cameraName))];
    // console.log("cameras : ", cameras);

    const colors = ['#00A9FF', '#FFB840', '#FF5A46', '#00BD9F', '#785FFF', '#F28B8C', '#989486', '#516F7D', '#28E6EB', '#28695F'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            right: '2%', // 오른쪽으로 이동
            top: 'middle', // 세로 중앙 정렬
            textStyle: {
                color: '#FFFFF' 
            },
            data: cameras
        },
        grid: {
            left: '3%',
            right: '15%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category', // x축 타입을 category로 변경
            boundaryGap: false,
            data: Array.from({ length: 31 }, (_, i) => i + 1), // 1부터 31까지의 배열 생성
            splitLine: {    // x축의 분할선 설정
                show: true, // 분할선 표시 여부
                axisLine: {    // x축에 대한 스타일 설정
                    lineStyle: {
                        color: '#CCCCCC',  // 구분선의 색상 설정
                        width: 1,       // 구분선의 너비 설정
                        type: 'solid'   // 구분선의 종류 설정 (solid, dashed, dotted 등)
                    }
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {    // y축의 분할선 설정
                show: true, // 분할선 표시 여부
                axisLine: {    // y축에 대한 스타일 설정
                    lineStyle: {
                        color: '#CCCCCC',  // 구분선의 색상 설정
                        width: 1,       // 구분선의 너비 설정
                        type: 'solid'   // 구분선의 종류 설정 (solid, dashed, dotted 등)
                    }
                },
            }
        },
        series: cameras.map(camera => {
            const cameraData = Array.from({ length: 31 }, (_, i) => {
                const currentDate = i + 1;
                const matchingEntry = daliyCountList.find(entry => {
                    const entryDate = new Date(entry.logDate).getDate();
                    return entryDate === currentDate && entry.cameraName === camera;
                });
                return matchingEntry ? parseInt(matchingEntry.cnt) : 0;
            });
            // console.log("cameraData : ", cameraData);
            return {
                name: camera,
                type: 'line',
                data: cameraData
            };
        })
    };

    dateDataChart.setOption(option);
}




