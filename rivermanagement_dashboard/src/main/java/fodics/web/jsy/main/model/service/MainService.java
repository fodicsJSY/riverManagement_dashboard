package fodics.web.jsy.main.model.service;

import java.time.LocalDate;
import java.util.List;

import fodics.web.jsy.main.model.dto.LineData;
import fodics.web.jsy.main.model.dto.Main;

public interface MainService {

	// 개문 데이터
	List<Main> openGateList(LocalDate occuDate);

	// 폐문 데이터
	List<Main> closeGateList(LocalDate occuDate);
	
	// 테이블 데이터
	List<Main> tableDataList();

	
	// 라인 차트 데이터
	List<LineData> daliyCountList(LocalDate occuDate);

	
	
	/** 게이트 현황
	 * @return list
	 */
	List<Main> gateLiveList();

	/** 카메라 개수
	 * @return int
	 */
	int cameraCount();

	/** 카메라 ip
	 * @return list
	 */
	List<Main> cameraIpList();
	
	

}
