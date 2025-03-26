const search = document.getElementById('search');
const input = document.getElementById('input');
const output = document.getElementById('result');




search.addEventListener('click',async ()=>{
  let url = 'https://api.weatherapi.com/v1/current.json';
  url += '?key=35b648c53efd44e8a9a211940252403';
  url += '&q=';
  url += input.value;

  try {
	  const response = await fetch(url);
	  let result = await response.json();
    displayWeather(result);

  } catch (error) {
    let output = document.getElementById('result');
    output.textContent = 'Please re-check if the city name is valid, then try again';
    output.style.color = 'red';
    output.style.fontWeight = 'bold';
  }
})

function displayWeather(data){
  console.log(data);

  /*getting the elements to display the data*/
  let update = document.getElementById('last_updated');
  let temperature = document.getElementById('temperature');
  let condition = document.getElementById('condition');
  let conditionText = document.getElementById('text');
  let icon = document.getElementById('icon');

  let windSpeed = document.getElementById('wind_kph');
  let windDirection = document.getElementById('direction');
  let feelsLike = document.getElementById('feels_like');
  
  let city = document.getElementById('city');
  let region = document.getElementById('region');
  let country = document.getElementById('country');
  let localTime = document.getElementById('localTime');


  let video = document.querySelector('video');

  /*displaying the data*/

  update.textContent = 'last updated: '+data.current.last_updated;
  temperature.textContent ='temperature: '+ data.current.temp_c + '°C';
  conditionText.textContent = data.current.condition.text;
  condition.textContent = 'condition:';

  windSpeed.textContent = 'wind speed: '+ data.current.wind_kph + ' km/h';
  windDirection.textContent = 'wind direction: '+ data.current.wind_dir;
  feelsLike.textContent = 'feels like: '+ data.current.feelslike_c + '°C';

  /*displaying the location data*/
  city.textContent = 'city: '+ data.location.name;
  region.textContent = 'region: '+ data.location.region;
  country.textContent = 'country: '+ data.location.country;
  localTime.textContent = 'local time: '+ data.location.localtime;

  /*configuring the icon and the background video*/
  icon.src = data.current.condition.icon;

  if (data.current.condition.code == 1000){
    video.src = 'sunny.mp4';
    video.load();
  }
  else if(data.current.condition.code <= 1030){
    video.src = 'cloudy.mp4';
    video.load();
  }
  else if(data.current.condition.code <= 1189){
    video.src = 'rain.mp4';
    video.load();
  }
  else {
    video.src = 'thunderstorm.mp4';
    video.load();
  }
}

function toogle_menu(){
  let menu = document.getElementById('side-menu');
  let toogler = document.getElementById('menu')

  if (menu.style.left =='0px'){
    menu.style.left = '-15%';

    toogler.style.opacity = 0.5;
    toogler.style.left = 0;
  }
  else{
    menu.style.left = 0;
    toogler.style.opacity = 1;

    toogler.style.left = '15%';
  }
}