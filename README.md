# ToDoList(WoogleWoogle)
## 내용
reactJS와 SpringMVC을 이용한 간단한 웹애플리케이션
http://woogle-bucket.s3-website.ap-northeast-2.amazonaws.com/

## 기술
 * frontend = AWS S3 / ReactJS 16.14.1 (Router) / material-ui / Axios
 * backend = AWS ec2 / spring 4.3.7 ( MVC, security, JWT, lombok, JPA) / Tomcat 8.5 / MySql 8.0
     
 * spring security + JWT(JSON Web Token)을 이용하여 로그인 구현.    
   - 서버에서 보내준 토큰 값을 클라이언트에서 보관 및 서버요청시 헤더에 포함해서 같이 보내어 사용자 인증, 권한을 확인. 
 * react 의 Axios를 이용하여 backend와 통신하여 데이터를 주고 받는다.
 * JS geolocation으로 사용자의 현재위치를 불러와 현재위치의 날씨를 가져온다 
 * woogle contents의 내용들은 DB에 저장 
 * Restful API 이용하여 자원처리 @GetMapping("/woogle") @PostMapping("/woogle") @DeleteMapping("/woogle")
## 기능
 * 로그인/로그아웃 기능, 사용자 개별의 데이터를 저장 가능.
 * 실시간 시간확인
 * 사용자의 현재위치를 기반으로 weatherAPI의 데이터를 이용하여 날씨 표현
 * 개인적으로 자주 사용되는 사이트 검색기능
 * 페이지 좌우를 나누어 toDoList와 자주방문하는 URL 표현
 * list목록은 등록, 삭제가 자유롭게 가능.
 * toDoList 버튼 클릭 시, 마우스커서 위치에 detail화면을 띄어준다.
 * URL 버튼을 클릭 시 해당 사이트로 이동.
 * 창 크기에 최대한 제약이 없도록 컴포넌트를 배치(반응형)     
## Issue
 * Geolocation API의 위치관련 정보는 인증서가 적용된 https 웹에서 적용가능.
 * JWT필터가 작동하지않음 -> JWT필터를 등록해놓은 spring security config가 작동하지않음.
  - @EnableWebSecurity를 명시해도 반응이 없어서 web.xml에 securityFilter를 직접 등록하니 정상적으로 config class가 작동되었다. 
 * 클라이언트의 도메인, 포트와 다른 서버에게 자원을 요청시 sop(same origin policy)에 위반하는 상황이 발생.
  - cors(cross origin resources sharing)을 허용하는 설정을 security config에 명시

## 구동
<img src="woogleShot/main.PNG" width="200" height="300"></img>

<img src="woogleShot/main2.PNG" width="400" height="300"></img>

<img src="woogleShot/add.PNG" width="400" height="300"></img>

<img src="woogleShot/detail.PNG" width="400" height="300"></img>

<img src="woogleShot/smallWin.PNG" width="200" height="300"></img>

