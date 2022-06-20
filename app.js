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

      // once we got the data,
      // populate the data into the dom
      

      // current 
      const datetime = moment(weatherData.current.dt, 'X').format("YYYY-MM-DD");
      console.log(datetime);

      currentDayCity.innerHTML = `${userInput} ${datetime} icon`
      currentDayHumidity.textContent = weatherData.current.humidity;
      currentDayTemp.textContent = weatherData.current.temp + 'K';
      currentDayWind.textContent = weatherData.current.wind_speed + " kmh";
      // store the city name into localstorage
      // render the history in the search list
    })
  
});


 let results ="cards";
 console.log(results)
  //declare start date to check against
    // startDate = 20
    //have end date, endDate = startDate + 5

    for (let i = 0; i < results.length; i++) {

        let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
        let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
        console.log(day);
        console.log(hour);
  
        if(results[i].dt_txt.indexOf("12:00:00") !== -1){
          
          // get the temperature and convert to fahrenheit 
          let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
          let tempF = Math.floor(temp);
  
          const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
          const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
          const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
          const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
          const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
  
          const icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
  
          cardBody.append(cityDate, icon, temperature, humidity);
          card.append(cardBody);
          $("#forecast").append(card);
  
        }
      }

  
