const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if(status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };
  
  //링크 : 데이터가 들어오는곳
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=8075a1556d0de06563f4848ebcf069f2&units=metric',
  //실행 함수
  function a (err, data) {
    if(err !== null) {
      alert("오류!(조금 있다가 다시 시도해주세요...)  오류코드 : " + err);
    } else {
      let main_weather = data.weather[0].main;
      document.querySelector('.weather').innerHTML=`현재 온도 : ${data.main.temp}도 입니다.<br>현재 날씨 : ${main_weather}`
      //시간과 날짜를 받는 함수를 가져옴.
      let date = new Date();
      //그중 시간에 대한것만 가져옴 (time)
      let time = date.getHours()
      //콘솔에서 확인 가능
      console.log(time)
      //만약 시간이 오후7시부터 새벽 4시인경우 달 이미지를 띄움 아닐경우는 해를 띄움.
      const cloud = document.querySelector('.cloud');
      const main_img = document.querySelector('.image')
      if(main_weather == 'Mist'||main_weather == 'Clouds'){
        cloud.src='./images/cloud.png'
        cloud.style.position='absolute';
        if(time <= 4 || time >=19){
          main_img.src='./images/moon.png'
        }else{
          main_img.src='./images/sun.png'
        }
      }else if(main_weather == 'Rain'){
        cloud.src='./images/rain.png'
        cloud.style.position='static';
        main_img.src=''
      }else{
        if(time <= 4 || time >=19){
          main_img.src='./images/moon.png'
        }else{
          main_img.src='./images/sun.png'
        }
      }
      
    }
  });