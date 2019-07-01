module.exports.function = function getCurrentPosition (point) {
  const http=require("http");
  const config=require("config");
  const console=require("console");
  var API=config.get("apiUrl");
  var KAPI=config.get("kakaoUrl");
  let options1 = {
    format: 'json',
    headers: {
      'accept': 'application/json'
    },
  };
  
  let options2 = {
    format: 'json',
    headers: {
      'accept': 'application/json',
      'Authorization': 'KakaoAK c5e0e39648e51d59f26c2740459d223e'
    },
  };
  
  function makeUrl(x,y){
    var fullurl=KAPI+"x="+x+"&"+"y="+y+"&"+"input_coord=WGS84&output_coord=WTM";
    return fullurl;
  }
  
 
  let TransFormUrl = makeUrl(point.longitude,point.latitude);

  let response = http.getUrl(TransFormUrl, options2);  
  let x=response.documents[0].x;
  let y=response.documents[0].y;

  let GetStationUrl = API+x+"/"+y;
  
  let data = http.getUrl(GetStationUrl,options1);
  
  console.log(data.stationList[0].statnNm);
  
  return {
      myPos: { //현위치 geo.CurrentLocation 을 가져옴
      latitude : point.latitude,   // 위도
      longitude: point.longitude   // 경도
    }
  };
}
