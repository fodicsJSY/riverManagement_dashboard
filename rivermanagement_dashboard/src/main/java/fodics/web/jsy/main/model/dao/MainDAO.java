package fodics.web.jsy.main.model.dao;

import java.time.LocalDate;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import fodics.web.jsy.main.model.dto.LineData;
import fodics.web.jsy.main.model.dto.Main;

@Repository
public class MainDAO {
	
	@Autowired
	private SqlSessionTemplate sql;

	
	
	
	/** 개문횟수
	 * @return list
	 */
	public List<Main> openGateList(LocalDate occuDate) {
		return sql.selectList("mainMapper.openGateList", occuDate);
	}
	
	/** 폐문횟수
	 * @return list
	 */
	public List<Main> closeGateList(LocalDate occuDate) {
		return sql.selectList("mainMapper.closeGateList", occuDate);
	}

	/** 테이블 데이터
	 * @return list
	 */
	public List<Main> tableDataList() {
		return sql.selectList("mainMapper.tableDataList");
	}

	/** 막대차트
	 * @return list
	 */
	public List<LineData> daliyCountList(LocalDate occuDate) {
		return sql.selectList("lineDataMapper.daliyCountList", occuDate);
	}

	/** 게이트 현황
	 * @return list
	 */
	public List<Main> gateLiveList() {
		return sql.selectList("mainMapper.gateLiveList");
	}

	/** 카메라 개수
	 * @return int
	 */
	public int cameraCount() {
		return sql.selectOne("mainMapper.cameraCount");
	}

	/** 카메라 ip
	 * @return list
	 */
	public List<Main> cameraIpList() {
		return sql.selectList("mainMapper.cameraIpList");
	}

	
	

}
