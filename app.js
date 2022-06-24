const searchForm = document.getElementById('search-form');
const inputSearch = document.getElementById('input-search');
const currentDayCity = document.getElementById('current-day-city');
const currentDayTemp = document.getElementById('current-day-temp');
const currentDayWind = document.getElementById('current-day-wind');
const currentDayHumidity = document.getElementById('current-day-humidity');

const apiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';



function getOneCallApi(lon, lat){

  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(res){
      return res.json()
    })

}


function getWeatherData(city) {
  
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(response){
      return response.json();
    })
    .then(function(currentWeather){

      // console.log(currentWeather);

      return getOneCallApi(currentWeather.coord.lon, currentWeather.coord.lat, currentWeather.dt)
    })
    


}



// when I click on the search button
searchForm.addEventListener('submit', function(event){
  event.preventDefault();

  // get user input
  const userInput = inputSearch.value;
  
  // send req to weatherdashboard api, 
  
  // fetch weather data based on city name
  getWeatherData(userInput)
    .then(function(weatherData){

      console.log(weatherData);

      // got the data,
      //  now populate the data into the dom
      

      // current 
      const datetime = moment(weatherData.current.dt, 'X').format("YYYY-MM-DD");
      console.log(datetime);

      //currentDayCity.innerHTML = `${userInput} ${datetime} icon`
      currentDayCity.innerHTML = `${userInput} ${datetime} <img src=https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png width=50>`
      currentDayHumidity.textContent = weatherData.current.humidity;
      currentDayTemp.textContent = weatherData.current.temp + 'K';
      currentDayWind.textContent = weatherData.current.wind_speed + " kmh";
      
      //card 1
      
      document.querySelector("#dayOneDate").innerHTML =  moment(weatherData.daily[0].dt , 'X').format("YYYY-MM-DD");
      document.querySelector("#dayOneTemp").innerHTML = weatherData.daily[0].temp.max
      document.querySelector("#dayOneWind").innerHTML = weatherData.daily[0].wind_speed
      document.querySelector("#dayOneHumidity").innerHTML = weatherData.daily[0].humidity
      
      //card2
      document.querySelector("#dayTwoDate").innerHTML =  moment(weatherData.daily[1].dt , 'X').format("YYYY-MM-DD");
      document.querySelector("#dayTwoTemp").innerHTML = weatherData.daily[1].temp.max
      document.querySelector("#dayTwoWind").innerHTML = weatherData.daily[1].wind_speed
      document.querySelector("#dayTwoHumidity").innerHTML = weatherData.daily[1].humidity
      
      //card3
      document.querySelector("#dayThreeDate").innerHTML =  moment(weatherData.daily[2].dt , 'X').format("YYYY-MM-DD");
      document.querySelector("#dayThreeTemp").innerHTML = weatherData.daily[2].temp.max
      document.querySelector("#dayThreeWind").innerHTML = weatherData.daily[2].wind_speed
      document.querySelector("#dayThreeHumidity").innerHTML = weatherData.daily[2].humidity
      
      //card4
      document.querySelector("#dayFourDate").innerHTML =  moment(weatherData.daily[3].dt , 'X').format("YYYY-MM-DD");
      document.querySelector("#dayFourTemp").innerHTML = weatherData.daily[3].temp.max
      document.querySelector("#dayFourWind").innerHTML = weatherData.daily[3].wind_speed
      document.querySelector("#dayFourHumidity").innerHTML = weatherData.daily[3].humidity
        
      //card5
      document.querySelector("#dayFiveDate").innerHTML =  moment(weatherData.daily[4].dt , 'X').format("YYYY-MM-DD");
      document.querySelector("#dayFiveTemp").innerHTML = weatherData.daily[4].temp.max
      document.querySelector("#dayFiveWind").innerHTML = weatherData.daily[4].wind_speed
      document.querySelector("#dayFiveHumidity").innerHTML = weatherData.daily[4].humidity
    })
  
})
