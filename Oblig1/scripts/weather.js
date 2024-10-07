const locations = [
    {
      name: "Batman, Turkey", lat: 37.875, lon: 41.125
    },
    {
      name: "Bigfoot, Texas USA", lat: 29.033, lon: -98.876
    },
    {
      name: "Chicken, Alaska USA", lat: 64.0733, lon: -141.9361
    },
    {
      name: "Hooker, Oklahoma USA", lat: 36.872, lon: -101.215
    },
    {
      name: "Kill, Leinster Ireland", lat: 53.255, lon: -6.580
    }
  ];
  


function fetchWeatherData(place, elementID){
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m`)
    .then(response => response.json())
    .then(data => {
        let fetchedTime = new Date();
        let timeString = fetchedTime.toLocaleTimeString('en-GB', { hour12: false });
        document.getElementById(elementID).innerHTML = `
        <h3>${place.name}</h3>
        <p>Temperature: ${data.current.temperature_2m} °C</p>
        <p>Humidity: ${data.current.relative_humidity_2m} %</p>
        <p>Precipitation: ${data.current.precipitation} mm</p>
        <p>Weather Code: ${data.current.weather_code} (WMO code)</p>
        <p>Cloud Cover: ${data.current.cloud_cover} % </p>
        <p>Wind Speed: ${data.current.wind_speed_10m} km/h</p>
        <p>Wind Direction: ${data.current.wind_direction_10m} °</p>
        <p>Fetched at: ${data.current.time}</p>
        <p>Updated at: ${timeString}</p>
        `;
    })
    .catch(error => {
        console.error("Error getting data: ", error);
    })
}



function fetchAllWeatherData() {
    for (let i = 0; i < locations.length; i++) {
        fetchWeatherData(locations[i], `location${i+1}`);
    }
}


fetchAllWeatherData();

// Set up a timer to fetch weather data every 5 minutes
setInterval(fetchAllWeatherData, 1 * 60 * 1000);