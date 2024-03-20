package fodics.web.jsy.main.model.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fodics.web.jsy.main.model.dao.MainDAO;
import fodics.web.jsy.main.model.dto.LineData;
import fodics.web.jsy.main.model.dto.Main;

@Service
public class MainServiceImpl implements MainService{

	
		@Autowired
		private MainDAO dao;
		
		
		
		/**
		 * 개문 데이터
		 */
		@Override
		public List<Main> openGateList(LocalDate occuDate) {
			return dao.openGateList(occuDate);
		}
		
		
		/**
		 * 폐문 데이터
		 */
		@Override
		public List<Main> closeGateList(LocalDate occuDate) {
			return dao.closeGateList(occuDate);
		}

		
		/**
		 * 테이블 데이터
		 */
		@Override
		public List<Main> tableDataList() {
			return dao.tableDataList();
		}
		
		
		/**
		 * 라인 차트 데이터
		 */
		@Override
		public List<LineData> daliyCountList(LocalDate occuDate) {
		return dao.daliyCountList(occuDate);
		}

		
		// 게이트 현황
		@Override
		public List<Main> gateLiveList() {
		return dao.gateLiveList();
		}
		
		
		// 카메라 개수
		@Override
		public int cameraCount() {
		return dao.cameraCount();
		}
		
		
		// 카메라 ip
		@Override
		public List<Main> cameraIpList() {
		return dao.cameraIpList();
		}
		

}
