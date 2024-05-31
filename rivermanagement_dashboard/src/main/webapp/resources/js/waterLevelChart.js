// 수위 bar chart
var waterLevelChart;


function waterLevel(barData){
    console.log("수위막대");
    console.log("result", barData);
    let barDataList = barData.result;
    
    let radarCode =[];
    let waterDepth =[];
    
    for(let i =0; i<barDataList.length;i++){
        console.log("for문");
        console.log("i :" , i);

        radarCode.push(barDataList[i][1]);
        waterDepth.push(barDataList[i][3]);
    }
    console.log("radarCode : ", radarCode);
    console.log("waterDepth : ", waterDepth);
    

    waterLevelChart = echarts.init(document.getElementById('waterLevelChart'));
        
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
                data: waterDepth,
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

    waterLevelChart.setOption(option);
}




