package fodics.web.jsy.main.controller;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

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
	    
	    
	    Map<String, Object> map = new HashMap<>();
	    
//	    System.out.println("map : " + map);
	    
	    return map; 
	}
	

	
	// liveBar 받기
	// 수위,유속,유량 막대차트 
	@PostMapping("/liveBarData")
	@ResponseBody
	public String liveBarData(
			@RequestBody  String req
			) {
//		 System.out.println("liveBarData req: " + req);
		
		String ipAddress;
		String port;
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		try {
			InputStream is = getClass().getResourceAsStream("/server_info.ini");
			Scanner s = new Scanner(is);
			ipAddress = s.nextLine();
			port = s.nextLine();
//			System.out.println("liveBarData ipAddress : "+ ipAddress);
//			System.out.println("liveBarData port : "+ port);
			s.close();
			is.close();
			
			// JSON 문자열을 파싱하여 필요한 변수에 할당
			JSONObject jsonObject = new JSONObject(req);
			String serverip = jsonObject.getString("serverip");
			String query = jsonObject.getString("query");
//			System.out.println("liveBarData serverip : "+ serverip);
//			System.out.println("liveBarData query : "+ query);
			
			String select_url = "http://"+ipAddress+":"+port+"/fnvr/request/query/select"; // 외부 RESTful API의 URL select
//			System.out.println("liveBarData url : "+ select_url);
			
			// 서버로 전송할 객체 생성
			Map<String, String> requestBody = new LinkedHashMap<>();
			requestBody.put("query", query);
			requestBody.put("serverip", serverip);
//			System.out.println("liveBarData requestBody : "+ requestBody);
			
			// 요청 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			// HttpEntity 생성
			HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
			
			// post 요청 보내기
			String select_url_resp = restTemplate.postForObject(select_url, requestEntity, String.class);
			
//			System.out.print("select_url_resp"+ select_url_resp);
			
			// 응답 데이터를 클라이언트에 반환
			return select_url_resp;
			
			
			
		} catch (Exception e) {
			//  System.out.println("Read Query Error");
			e.printStackTrace();
			return ""; // 예외가 발생하면 빈 문자열을 반환하도록 수정
		}
		
	}
	
	
	
	
	

	// 라인차드 combo option값 가져오기 
	@PostMapping(value="/comboData", produces="text/plain; charset=UTF-8")
	@ResponseBody
	public String comboData(
			@RequestBody  String req
			) {
//		System.out.println("req: " + req);
		
	 	String ipAddress;
	    String port;

	    // MappingJackson2HttpMessageConverter 추가
	    restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

	    try {
	    	InputStream is = getClass().getResourceAsStream("/server_info.ini");
	        Scanner s = new Scanner(is);
	        ipAddress = s.nextLine();
	        port = s.nextLine();
//	        System.out.println("comboData ipAddress : "+ ipAddress);
//	        System.out.println("comboData port : "+ port);
	        s.close();
	        is.close();

	        // JSON 문자열을 파싱하여 필요한 변수에 할당
	        JSONObject jsonObject = new JSONObject(req);
	        String serverip = jsonObject.getString("serverip");
	        String query = jsonObject.getString("query");
//            System.out.println("comboData serverip : "+ serverip);
//            System.out.println("comboData query : "+ query);

	        String select_url = "http://"+ipAddress+":"+port+"/fnvr/request/query/select"; // 외부 RESTful API의 URL select
//	        System.out.println("comboData url : "+ select_url);

	        // 서버로 전송할 객체 생성
	        Map<String, String> requestBody = new LinkedHashMap<>();
	        requestBody.put("query", query);
	        requestBody.put("serverip", serverip);
//	        System.out.println("comboData requestBody : "+ requestBody);

	        // 요청 헤더 설정
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);

	        // HttpEntity 생성
	        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

	        // post 요청 보내기
	        String select_url_resp = restTemplate.postForObject(select_url, requestEntity, String.class);

//	        System.out.println("select_url_resp"+ select_url_resp);
	        
	        // 응답 데이터를 클라이언트에 반환
	        return select_url_resp;
	        
	        
	        
	    } catch (Exception e) {
	       //  //  System.out.println("Read Query Error");
	        e.printStackTrace();
	        return ""; // 예외가 발생하면 빈 문자열을 반환하도록 수정
	    }
	}
	

	
	/*********************** 라인차트 시작 ********************************/
	
	
	
	// 수위 라인차트 
	@PostMapping(value="/waterLevel", produces="text/plain; charset=UTF-8")
	@ResponseBody
	public String waterLevel(
			@RequestBody  String req
			) {
		
//		System.out.println("waterLevel라인차트 req: " + req);
		
		String ipAddress;
		String port;
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		try {
			InputStream is = getClass().getResourceAsStream("/server_info.ini");
			Scanner s = new Scanner(is);
			ipAddress = s.nextLine();
			port = s.nextLine();
//			  System.out.println("waterLevel ipAddress : "+ ipAddress);
//			  System.out.println("waterLevel port : "+ port);
			s.close();
			is.close();
			
			// JSON 문자열을 파싱하여 필요한 변수에 할당
			JSONObject jsonObject = new JSONObject(req);
			String serverip = jsonObject.getString("serverip");
			String query = jsonObject.getString("query");
//			  System.out.println("waterLevel serverip : "+ serverip);
//			  System.out.println("waterLevel query : "+ query);
			
			String select_url = "http://"+ipAddress+":"+port+"/fnvr/request/query/select"; // 외부 RESTful API의 URL execute
			//  System.out.println("tableData01 url : "+ select_url);
			
			// 서버로 전송할 객체 생성
			Map<String, String> requestBody = new LinkedHashMap<>();
			requestBody.put("query", query);
			requestBody.put("serverip", serverip);
//			  System.out.println("waterLevel requestBody : "+ requestBody);
			
			// 요청 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			// HttpEntity 생성
			HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
			
			// post 요청 보내기
			String select_url_resp = restTemplate.postForObject(select_url, requestEntity, String.class);
			
//			  System.out.println("waterLevel select_url_resp"+ select_url_resp);
			
			// 응답 데이터를 클라이언트에 반환
			return select_url_resp;
			
		} catch (Exception e) {
			//  System.out.println("Read Query Error");
			e.printStackTrace();
			return ""; // 예외가 발생하면 빈 문자열을 반환하도록 수정
		}
	}
	
	
	
	// 유속 라인차트 
	@PostMapping(value="/flowRate", produces="text/plain; charset=UTF-8")
	@ResponseBody
	public String flowRate(
			@RequestBody  String req
			) {
		
//		System.out.println("flowRate라인차트 req: " + req);
		
		String ipAddress;
		String port;
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		try {
			InputStream is = getClass().getResourceAsStream("/server_info.ini");
			Scanner s = new Scanner(is);
			ipAddress = s.nextLine();
			port = s.nextLine();
//			  System.out.println("flowRate ipAddress : "+ ipAddress);
//			  System.out.println("flowRate port : "+ port);
			s.close();
			is.close();
			
			// JSON 문자열을 파싱하여 필요한 변수에 할당
			JSONObject jsonObject = new JSONObject(req);
			String serverip = jsonObject.getString("serverip");
			String query = jsonObject.getString("query");
//			  System.out.println("flowRate serverip : "+ serverip);
//			  System.out.println("flowRate query : "+ query);
			
			String select_url = "http://"+ipAddress+":"+port+"/fnvr/request/query/select"; // 외부 RESTful API의 URL execute
//			  System.out.println("flowRate url : "+ select_url);
			
			// 서버로 전송할 객체 생성
			Map<String, String> requestBody = new LinkedHashMap<>();
			requestBody.put("query", query);
			requestBody.put("serverip", serverip);
//			  System.out.println("flowRate requestBody : "+ requestBody);
			
			// 요청 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			// HttpEntity 생성
			HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
			
			// post 요청 보내기
			String select_url_resp = restTemplate.postForObject(select_url, requestEntity, String.class);
			
//			  System.out.print("select_url_resp"+ select_url_resp);
			
			// 응답 데이터를 클라이언트에 반환
			return select_url_resp;
			
		} catch (Exception e) {
			//  System.out.println("Read Query Error");
			e.printStackTrace();
			return ""; // 예외가 발생하면 빈 문자열을 반환하도록 수정
		}
	}
	
	
	
	// 유량 라인차트 
	@PostMapping(value="/streamFlow", produces="text/plain; charset=UTF-8")
	@ResponseBody
	public String streamFlow(
			@RequestBody  String req
			) {
		
//		System.out.println("streamFlow라인차트 req: " + req);
		
		String ipAddress;
		String port;
		
		// MappingJackson2HttpMessageConverter 추가
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		try {
			InputStream is = getClass().getResourceAsStream("/server_info.ini");
			Scanner s = new Scanner(is);
			ipAddress = s.nextLine();
			port = s.nextLine();
//			  System.out.println("streamFlow ipAddress : "+ ipAddress);
//			  System.out.println("streamFlow port : "+ port);
			s.close();
			is.close();
			
			// JSON 문자열을 파싱하여 필요한 변수에 할당
			JSONObject jsonObject = new JSONObject(req);
			String serverip = jsonObject.getString("serverip");
			String query = jsonObject.getString("query");
//			  System.out.println("streamFlow serverip : "+ serverip);
//			  System.out.println("streamFlow query : "+ query);
			
			String select_url = "http://"+ipAddress+":"+port+"/fnvr/request/query/select"; // 외부 RESTful API의 URL execute
//			  System.out.println("streamFlow url : "+ select_url);
			
			// 서버로 전송할 객체 생성
			Map<String, String> requestBody = new LinkedHashMap<>();
			requestBody.put("query", query);
			requestBody.put("serverip", serverip);
			  System.out.println("streamFlow requestBody : "+ requestBody);
			
			// 요청 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			// HttpEntity 생성
			HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
			
			// post 요청 보내기
			String select_url_resp = restTemplate.postForObject(select_url, requestEntity, String.class);
			
//			  System.out.print("select_url_resp"+ select_url_resp);
			
			// 응답 데이터를 클라이언트에 반환
			return select_url_resp;
			
		} catch (Exception e) {
			//  System.out.println("Read Query Error");
			e.printStackTrace();
			return ""; // 예외가 발생하면 빈 문자열을 반환하도록 수정
		}
	}
	
	
		
	/*********************** 라인차트 끝 ********************************/	
	
	
	
	
		
		
	
	
	
	
}
