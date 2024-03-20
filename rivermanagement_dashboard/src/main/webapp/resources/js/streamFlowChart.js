// 유량 bar chart

var streamFlowChart;

streamFlowChart = echarts.init(document.getElementById('streamFlowChart'));
    
option = {
    xAxis: {
        type: 'category',
        data: ['지역명1', '지역명2', '지역명3', '지역명4', '지역명5', '지역명6', '지역명7', '지역명8', '지역명9', '지역명10'],
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
            data: [120, 200, 150, 80, 70, 110, 130, 180, 130, 30],
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

streamFlowChart.setOption(option);