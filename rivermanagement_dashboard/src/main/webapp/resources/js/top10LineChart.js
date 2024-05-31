let lineDataList;
let dateDataChart; 

function top10LineChart(result) {
    console.log("top10LineChart result : ", result);
    lineDataList = result.result;

    console.log("lineDataList : ", lineDataList);
    // console.log("일별 구동 차트");

    // 시간대별로 구동 횟수를 누적할 객체
    let lineData = {};

    // 이전에 있던 차트 객체가 있으면 삭제
    if (dateDataChart) {
        dateDataChart.dispose();
    }
    
    
    // 데이터 처리
    lineDataList.forEach(item => {
        console.log("item : ", item);
        const radar_code = item[0]; // 레이더코드
        console.log("radar_code : ", radar_code);
        const hour = parseInt(item[2], 10); // 시간
        console.log("hour : ", hour);
        const water_depth = parseFloat(item[3]); // 수위
        console.log("water_depth : ", water_depth);
        const surface_velocity = parseFloat(item[4]); // 유속
        console.log("surface_velocity : ", surface_velocity);
        const instant_flow = parseFloat(item[5]); // 유량
        console.log("instant_flow : ", instant_flow);

        // 해당 레이더 코드가 없으면 새로운 객체로 초기화
        if (!lineData[radar_code]) {
            lineData[radar_code] = Array(24).fill(0).map(() => ({
                water_depth: 0,
                surface_velocity: 0,
                instant_flow: 0
            })); // 24시간을 0으로 초기화
        }

        // 시간대별 데이터 누적
        lineData[radar_code][hour].water_depth += water_depth;
        lineData[radar_code][hour].surface_velocity += surface_velocity;
        lineData[radar_code][hour].instant_flow += instant_flow;
    });
    console.log("top10LineChart lineData : ", lineData);


// 최종 시리즈 데이터 생성
const seriesData = Object.keys(lineData).map(radar_code => ({
    name: radar_code,
    type: 'line',
    data: lineData[radar_code].map(item => item.instant_flow) // 예시로 instant_flow를 사용
}));
console.log("top10LineChart seriesData : ", seriesData);



// ECharts 초기화 및 옵션 설정
dateDataChart = echarts.init(document.getElementById('dateData'));

const colors = ['#00A9FF', '#FFB840', '#FF5A46', '#00BD9F', '#785FFF', '#F28B8C', '#989486', '#516F7D', '#28E6EB', '#28695F'];
const option = {
    color: colors,
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Array.from({ length: 24 }, (_, i) => i), // 0부터 23까지의 배열 생성
        splitLine: {
            show: true,
            lineStyle: {
                color: '#CCCCCC',
                width: 1,
                type: 'solid'
            }
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: '#CCCCCC',
                width: 1,
                type: 'solid'
            }
        }
    },
    series: seriesData
};

dateDataChart.setOption(option);
}




