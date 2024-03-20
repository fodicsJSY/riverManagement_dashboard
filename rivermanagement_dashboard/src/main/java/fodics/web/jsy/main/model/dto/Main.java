package fodics.web.jsy.main.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Main {
	
	
	//테이블 데이터
	private String gateName;
	private String gateStatus;
	private String commStatus;

	//개문 도넛차트 데이터
	private String openTimeCnt0;
	private String openTimeCnt1;
	private String openTimeCnt2;
	private String openTimeCnt3;
	private String openTimeCnt4;
	private String openTimeCnt5;
	
	// 폐문 도넛차트 데이터
	private String closeTimeCnt0;
	private String closeTimeCnt1;
	private String closeTimeCnt2;
	private String closeTimeCnt3;
	private String closeTimeCnt4;
	private String closeTimeCnt5;
	
	
	// 게이트 현황
	private String gateTotalCnt;
	private String gateOpenCnt;
	private String gateCloseCnt;
	private String gateDisableCnt;
	
	
	// 카메라 현황
	private String cameraTotalCnt;
	private String ipAddr;
	
}
