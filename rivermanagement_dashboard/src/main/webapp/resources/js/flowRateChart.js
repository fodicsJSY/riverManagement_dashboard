// 유속 bar chart

var flowRateChart;

function flowRate(barData){
    let barDataList = barData.result;

    let radarCode =[];
    let surfaceVelocity =[];
    
    for(let i =0; i<barDataList.length;i++){
        console.log("for문");
        console.log("i :" , i);

        radarCode.push(barDataList[i][1]);
        surfaceVelocity.push(barDataList[i][4]);
    }
    console.log("radarCode : ", radarCode);
    console.log("surfaceVelocity : ", surfaceVelocity);

flowRateChart = echarts.init(document.getElementById('flowRateChart'));
    
option = {
    xAxis: {
        type: 'category',
        data: radarCode,
        axisLabel: {  // x축 레이블의 스타일 설정
            fontSize: 10 // 글꼴 크기 설정
        },
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
    series: [
        {
            data: surfaceVelocity,
            type: 'bar',
            itemStyle: {
                color: '#00A9FF' 
            },
            label: {  // 데이터 값 표시 설정
                show: true, // 데이터 값 표시 여부
                position: 'top' // 데이터 값 표시 위치 (위쪽)
            }
        }
    ]
};

flowRateChart.setOption(option);
}