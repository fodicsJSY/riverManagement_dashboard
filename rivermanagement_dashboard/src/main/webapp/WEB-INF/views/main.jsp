<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mainPage</title>
    <%-- 하천관리 :: 수위/유속/유량 --%>
    <%-- echarts --%>
    <script src="/resources/js/echart/echart.min.js"></script>

    <%-- jquery --%>
    <script src="/resources/js/jquery/jquery.min.js"></script>

    <%-- css --%>
    <link rel="stylesheet" href="/resources/css/main.css">
    <link rel="stylesheet" href="/resources/css/mainHD.css">
    <link rel="stylesheet" href="/resources/css/main4k.css">

    <style>
    </style>
</head>
<body>
<%-- <c:set var="rushHourPeopleCountList" value="${rushHourPeopleCountList}"/> --%>
    <main>
    <section>
        <div class="sectionBox1" >
            <div class="containerBox01">
                <div class="innerBox03">
                    <div class="logoContainer"><img src="/resources/img/logo.png" class="logoIcon" alt=""></div>
                    <div class="dashboardTitleBox">
                        <div class="dashboard">DASHBOARD</div>
                        <div class="dashboardTitle">하천관리통계</div>
                    </div>
                </div>
                <%-- <div class="innerBox04">
                    <div class="leftTitleBox" >
                        <div class="leftImgContainer"><img src="/resources/img/iconList_gate.png" class="markerIcon" alt=""></div>
                        <div class="leftTitle">게이트 현황</div>
                    </div>
                    <div class="dataContainer01">
                        <div class="leftDataBox dataTotal">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/icon_chLive.png" class="chLiveIcon" alt=""></div>
                                <div class="dataStats">Total</div>
                            </div>
                            <div class="dataCount"><span id="gateTotalCount"><span></div>
                        </div>
                        <div class="leftDataBox dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalOK.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">열림</div>
                            </div>
                            <div class="dataCount"><span id="gateOpenCount"><span></div>
                        </div>
                        <div class="leftDataBox dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalNO.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">닫힘</div>
                            </div>
                            <div class="dataCount"><span id="gateCloseCount"><span></div>
                        </div>
                        <div class="leftDataBox dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalBAD.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">통신불량</div>
                            </div>
                            <div class="dataCount"><span id="noSignalGateCount"><span></div>
                        </div>
                    </div>
                </div> --%>
                
                <div class="innerBox05">
                    <div class="leftTitleBox01" >
                        <div class="leftImgContainer"><img src="/resources/img/iconList_radar.png" class="cctvIcon" alt=""></div>
                        <div class="leftTitle">레이더정보</div>
                    </div>
                    <div class="dataContainer01">
                        <div class="leftDataBox01 dataTotal">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/icon_chLive.png" class="chLiveIcon" alt=""></div>
                                <div class="dataStats">Total</div>
                            </div>
                            <div class="dataCount"><span id="totalRaderCount"><span></div>
                        </div>
                        <div class="leftDataBox01 dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalOK.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">정상</div>
                            </div>
                            <div class="dataCount"><span id="openRaderCount"><span></div>
                        </div>
                        <%-- <div class="leftDataBox dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalNO.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">끊어짐</div>
                            </div>
                            <div class="dataCount"><span id="closeSignalCount">99<span>CH</div>
                        </div> --%>
                        <div class="leftDataBox01 dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalBAD.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">통신불량</div>
                            </div>
                            <div class="dataCount"><span id="noRaderCount"><span></div>
                        </div>
                    </div>
                </div>
                <div class="innerBox05">
                    <div class="leftTitleBox01" >
                        <div class="leftImgContainer"><img src="/resources/img/iconList_cctv.png" class="cctvIcon" alt=""></div>
                        <div class="leftTitle">카메라정보</div>
                    </div>
                    <div class="dataContainer01">
                        <div class="leftDataBox01 dataTotal">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/icon_chLive.png" class="chLiveIcon" alt=""></div>
                                <div class="dataStats">Total</div>
                            </div>
                            <div class="dataCount"><span id="totalSignalCount"><span></div>
                        </div>
                        <div class="leftDataBox01 dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalOK.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">정상</div>
                            </div>
                            <div class="dataCount"><span id="openSignalCount"><span></div>
                        </div>
                        <%-- <div class="leftDataBox dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalNO.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">끊어짐</div>
                            </div>
                            <div class="dataCount"><span id="closeSignalCount">99<span>CH</div>
                        </div> --%>
                        <div class="leftDataBox01 dataSection">
                            <div class="dataStatsBox">
                                <div class="dataStatsImgBox"><img src="/resources/img/connect-signalBAD.png" class="dataStatsImg" alt=""></div>
                                <div class="dataStats">통신불량</div>
                            </div>
                            <div class="dataCount"><span id="noSignalCount"><span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sectionBox2" >
            <div class="containerBox02">
                <div class="innerBox01 innerheader">
                    <div class="headerBtnBox">
                        <input type="date" class="calendarBtn abled" id="calenderButton">
                        <button class="arrowBtn abled" id="leftBtn"><img src="/resources/img/icon_goLeft.png" class="arrowIcon" alt=""></button>
                        <input type="date" class="inputDateBtn" id="inputDate">
                        <button class="arrowBtn abled" id="rightBtn"><img src="/resources/img/icon_goRight.png" class="arrowIcon" alt=""></button>
                        <button class="textBtn abled" id="yesterdayBtn">어제</button>
                        <button class="textBtn abled" id="todayBtn">오늘</button>
                        <button class="textBtn abled" id="beforeWeekBtn">1주전</button>
                    </div>
                    <div class="statsBtnBox"><button class="statsBtn" ><img src="/resources/img/icon_stats.png" class="statsIcon" alt="" disabled>&nbsp;통계</button></div>
                </div>

                <div class="innerBox02 innerBox1">
                    <div class="chartBox dounutChart01">
                        <div class="titleBox">
                            <div class="titleText01">실시간 수위</div>
                        </div>
                        <div class="dataBox" >
                            <div id="waterLevelChart" style="width: 100%; height: 100%;">

                            </div>
                        </div>
                    </div>
                    <div class="chartBox dounutChart01">
                        <div class="titleBox">
                            <div class="titleText01">실시간 유속</div>
                        </div>
                        <div class="dataBox">
                            <div id="flowRateChart" style="width: 100%; height: 100%;"> 
                            </div>
                        </div>
                    </div>
                    <div class="chartBox dounutChart01">
                        <div class="titleBox">
                            <div class="titleText01">실시간 유량</div>
                        </div>
                        <div class="dataBox">
                            <div id="streamFlowChart" style="width: 100%; height: 100%;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="innerBox02 innerBox1">
                    <div class="chartBox lineChart01">
                        <div class="titleBox">
                            <div class="titleText02">수위/유속/유량 정보</div>
                            <div class="comboBoxContainer">
                                <div class="cbBoxContainer">
                                    <select name="조회조건" class="comboBox" id="selectBox">
                                        <option value="top10"> TOP 10 </option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div class="titleText03">
                                <input type="radio" name="select" id="waterLevel" class="option" checked> <label for="waterLevel" class="label">수위</label>
                                <input type="radio" name="select" id="flowRate" class="option"> <label for="flowRate" class="label">유속</label>
                                <input type="radio" name="select" id="streamFlow" class="option"> <label for="streamFlow" class="label">유량</label>
                            </div>
                        </div>
                        <div class="dateDataBox">
                            <div id="dateData" style="width: 100%; height: 100%;">
                            </div>
                        </div>
                    </div>
                    <div class="chartBox" >
                        <div class="titleBox">
                            <div class="titleText01">수위/유속/유량 현황</div>
                        </div>
                        <div class="dateDataBox">
                            <div class="tableContainer" id="riverTableContainer">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="innerBox01 innerFooter">
                    <div class="text"> ※ 화면에 표시된 모든 실시간 데이터는 1분마다 자동으로 업데이트 합니다. </div><!--다만 "시간대별 현황" 그래프의 실시간 데이터는 정시에 한 번씩 업데이트 합니다.-->
                    <div><img src="/resources/img/fodics_logo.png" alt=""></div>
                </div>
            </div>
        </div>
    </section>
    </main>



    <script>

    </script>

    <%-- 전역변수 시작 --%>
    <script>
        // var kimpo7to8Count = ${kimpo7to8Count != null ? kimpo7to8Count : 0};
    </script>
    <%-- 전역변수 끝 --%>

    <%-- js --%>
    <script src="/resources/js/date.js"></script>
    <script src="/resources/js/riverTable.js"></script>
    <script src="/resources/js/liveInfo.js"></script>
    <script src="/resources/js/lineChart.js"></script>
    <%-- <script src="/resources/js/refresh.js"></script> --%>
    <script src="/resources/js/openCountChart.js"></script>
    <script src="/resources/js/closeCountChart.js"></script>
    <script src="/resources/js/streamFlowChart.js"></script>
    <script src="/resources/js/waterLevelChart.js"></script>
    <script src="/resources/js/flowRateChart.js"></script>
    <script src="/resources/js/main.js"></script>

</body>
</html>
