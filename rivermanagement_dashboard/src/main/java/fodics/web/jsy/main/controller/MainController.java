package fodics.web.jsy.main.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import fodics.web.jsy.main.model.dto.LineData;
import fodics.web.jsy.main.model.dto.Main;
import fodics.web.jsy.main.model.service.MainService;

@Controller
public class MainController {
	
	
	@Autowired
	private MainService service;
	
	
	private final RestTemplate restTemplate;

    @Autowired
    public MainController(RestTemplate restTemplate) {
      this.restTemplate = restTemplate;
    }

	
	
	
	@GetMapping("/")
	public String home() {
		return "main";
	}

	
	@PostMapping("/sendDate")
	@ResponseBody
	public Map<String, Object> loadData(
			@RequestBody Map<String, Object> paramMap
//			@RequestBody String occuDate
			) {
	    
//		System.out.println("paramMap: " + paramMap);
		 String occuDateString = (String) paramMap.get("occuDate");
		 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		 LocalDate occuDate = LocalDate.parse(occuDateString, formatter);
//	    System.out.println("occuDate: " + occuDate);
	    
	    // 개문 데이터
	    List<Main> openGateList = service.openGateList(occuDate);
	    
	    // 폐문 데이터
	    List<Main> closeGateList = service.closeGateList(occuDate);
	    
	    //테이블 데이터
	    List<Main> tableDataList = service.tableDataList();
	    
	    // 라인 차트 데이터
	    List<LineData> daliyCountList = service.daliyCountList(occuDate);

	    // 게이트 현황
	    List<Main> gateLiveList = service.gateLiveList();
	    
	    // 카메라 개수
	    int cameraCount = service.cameraCount();
	    
	    // 카메라 ip
	    List<Main> cameraIpList = service.cameraIpList();
	    
	    
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("tableDataList", tableDataList);
	    map.put("openGateList", openGateList);
	    map.put("closeGateList", closeGateList);
	    map.put("daliyCountList", daliyCountList);
	    map.put("gateLiveList", gateLiveList);
	    map.put("cameraCount", cameraCount);
	    map.put("cameraIpList", cameraIpList);
	    
//	    System.out.println("map : " + map);
	    
	    return map; 
	}
	
	
	
	
	
	
	// 개문횟수 
	@PostMapping("/openGateList")
	@ResponseBody
	public String openGateListData(
			@RequestBody  String req
			) {
		
//		System.out.println("req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
		String serverip = jsonObject.getString("serverip");
		String query = jsonObject.getString("query");
//		System.out.println("serverip : "+ serverip);
//		System.out.println("query : "+ query);
		
	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
		
		
		
		//서버로 전송할 객체 생성
		Map<String, String> requestBody = new LinkedHashMap<>();
		requestBody.put("serverip", serverip);
		requestBody.put("query", query);
//		System.out.println("requestBody : "+ requestBody);
		
		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		// HttpEntity 생성
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
		
		// post 요청 보내기
		String openGateList_resp = restTemplate.postForObject(url, requestEntity, String.class);
		
		
		System.out.print("openGateList_resp"+ openGateList_resp);
		
		// 응답 데이터를 클라이언트에 반환
		return openGateList_resp;
		
		
		
	}
	
	
	
	
	
	// 폐문횟수 
	@PostMapping("/closeGateList")
	@ResponseBody
	public String closeGateListData(
			@RequestBody  String req
			) {
		
//		System.out.println("req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
		String serverip = jsonObject.getString("serverip");
		String query = jsonObject.getString("query");
//		System.out.println("serverip : "+ serverip);
//		System.out.println("query : "+ query);
		
	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
		
		
		
		//서버로 전송할 객체 생성
		Map<String, String> requestBody = new LinkedHashMap<>();
		requestBody.put("serverip", serverip);
		requestBody.put("query", query);
//		System.out.println("requestBody : "+ requestBody);
		
		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		// HttpEntity 생성
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
		
		// post 요청 보내기
		String closeGateList_resp = restTemplate.postForObject(url, requestEntity, String.class);
		
		
		System.out.print("closeGateList_resp"+ closeGateList_resp);
		
		// 응답 데이터를 클라이언트에 반환
		return closeGateList_resp;
		
		
		
	}
	
	
	
	
	
	
	// 라인차트 
	@PostMapping("/sendLineQuery")
	@ResponseBody
	public String lineChartData(
			@RequestBody  String req
			) {
		
		System.out.println("라인차트 req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
//		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
//		JSONObject jsonObject = new JSONObject(req);
//	    String serverip = jsonObject.getString("serverip");
//	    String query = jsonObject.getString("query");
//	    System.out.println("serverip : "+ serverip);
//	    System.out.println("query : "+ query);
		
//	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
       
	    
       
       //서버로 전송할 객체 생성
//       Map<String, String> requestBody = new LinkedHashMap<>();
//       requestBody.put("serverip", serverip);
//       requestBody.put("query", query);
//       System.out.println("requestBody : "+ requestBody);

       // 요청 헤더 설정
//       HttpHeaders headers = new HttpHeaders();
//       headers.setContentType(MediaType.APPLICATION_JSON);

       // HttpEntity 생성
//       HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

       // post 요청 보내기
//       String sendLineQuery_resp = restTemplate.postForObject(url, requestEntity, String.class);
       
       
//       System.out.print("sendLineQuery_resp"+ sendLineQuery_resp);

       // 응답 데이터를 클라이언트에 반환
//       return sendLineQuery_resp;
       return req;
		
		

	}
	
	
	
	//테이블
	@PostMapping("/sendTableQuery")
	@ResponseBody
	public String tableData(
			@RequestBody  String req
			) {
		
//		System.out.println("req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
	    String serverip = jsonObject.getString("serverip");
	    String query = jsonObject.getString("query");
//	    System.out.println("serverip : "+ serverip);
//	    System.out.println("query : "+ query);
		
	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
       
	    
       //서버로 전송할 객체 생성
       Map<String, String> requestBody = new LinkedHashMap<>();
       requestBody.put("serverip", serverip);
       requestBody.put("query", query);
//       System.out.println("requestBody : "+ requestBody);

       // 요청 헤더 설정
       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(MediaType.APPLICATION_JSON);

       // HttpEntity 생성
       HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

       // post 요청 보내기
       String sendTableQuery_resp = restTemplate.postForObject(url, requestEntity, String.class);
       
       
       System.out.print("sendTableQuery_resp"+ sendTableQuery_resp);

       // 응답 데이터를 클라이언트에 반환
       return sendTableQuery_resp;

	}
	
	
	
		
		
	
	
	
	
	//게이트 현황(왼쪽)
	@PostMapping("/gateLiveList")
	@ResponseBody
	public String gateLiveListData(
			@RequestBody  String req
			) {
		
//		System.out.println("req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
	    String serverip = jsonObject.getString("serverip");
	    String query = jsonObject.getString("query");
//	    System.out.println("serverip : "+ serverip);
//	    System.out.println("query : "+ query);
//		
	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
       
	    
       
       //서버로 전송할 객체 생성
       Map<String, String> requestBody = new LinkedHashMap<>();
       requestBody.put("serverip", serverip);
       requestBody.put("query", query);
//       System.out.println("requestBody : "+ requestBody);

       // 요청 헤더 설정
       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(MediaType.APPLICATION_JSON);

       // HttpEntity 생성
       HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

       // post 요청 보내기
       String gateLiveList_resp = restTemplate.postForObject(url, requestEntity, String.class);
       
       
       System.out.print("gateLiveList_resp"+ gateLiveList_resp);

       // 응답 데이터를 클라이언트에 반환
       return gateLiveList_resp;

	}
	
	
	
	
	
	

	//카메라 개수 (왼쪽)
	@PostMapping("/cameraCount")
	@ResponseBody
	public String cameraCountData(
			@RequestBody  String req
			) {
		
//		System.out.println("req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
	    String serverip = jsonObject.getString("serverip");
	    String query = jsonObject.getString("query");
//	    System.out.println("serverip : "+ serverip);
//	    System.out.println("query : "+ query);
		
	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
       
	    
       
       //서버로 전송할 객체 생성
       Map<String, String> requestBody = new LinkedHashMap<>();
       requestBody.put("serverip", serverip);
       requestBody.put("query", query);
//       System.out.println("requestBody : "+ requestBody);

       // 요청 헤더 설정
       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(MediaType.APPLICATION_JSON);

       // HttpEntity 생성
       HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

       // post 요청 보내기
       String cameraCount_resp = restTemplate.postForObject(url, requestEntity, String.class);
       System.out.print("cameraCount_resp"+ cameraCount_resp);
       
       

       // 응답 데이터를 클라이언트에 반환
       return cameraCount_resp;

	}
	
	
	
	
	//카메라 ip(왼쪽)
	@PostMapping("/cameraIpList")
	@ResponseBody
	public String cameraIpListData(
			@RequestBody  String req
			) {
		
//		System.out.println("req: " + req);
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
		String serverip = jsonObject.getString("serverip");
		String query = jsonObject.getString("query");
//		System.out.println("serverip : "+ serverip);
//		System.out.println("query : "+ query);
		
	    String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL select
		
		
		
		//서버로 전송할 객체 생성
		Map<String, String> requestBody = new LinkedHashMap<>();
		requestBody.put("serverip", serverip);
		requestBody.put("query", query);
//		System.out.println("requestBody : "+ requestBody);
		
		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		// HttpEntity 생성
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
		
		// post 요청 보내기
		String cameraIpList_resp = restTemplate.postForObject(url, requestEntity, String.class);
		
		
		System.out.print("cameraIpList_resp"+ cameraIpList_resp);
		
		// 응답 데이터를 클라이언트에 반환
		return cameraIpList_resp;
		
	}








	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	



//	@PostMapping("/getDataFromAPI")
	@ResponseBody
	public String getDataFromAPI(@RequestBody String req) {
		
		System.out.println("req"+ req);
		

		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

		
		
		// JSON 문자열을 파싱하여 필요한 변수에 할당
		JSONObject jsonObject = new JSONObject(req);
	    String serverip = jsonObject.getString("serverip");
	    String query = jsonObject.getString("query");
	    System.out.println("serverip : "+ serverip);
	    System.out.println("query : "+ query);
		
//       String url = "http://172.16.103.34:8988/fnvr/request/query/select"; // 외부 RESTful API의 URL
       String url = "http://172.16.103.34:8988/fnvr/request/query/execute"; // 외부 RESTful API의 URL insert, update
       
       
       //서버로 전송할 객체 생성
       Map<String, String> requestBody = new LinkedHashMap<>();
       requestBody.put("serverip", serverip);
       requestBody.put("query", query);
       System.out.println("requestBody : "+ requestBody);

       // 요청 헤더 설정
       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(MediaType.APPLICATION_JSON);

       // HttpEntity 생성
       HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

       // post 요청 보내기
       String response = restTemplate.postForObject(url, requestEntity, String.class);
       
       
       System.out.print("response"+ response);

       // 응답 데이터를 클라이언트에 반환
       return response;
   }
	
}
