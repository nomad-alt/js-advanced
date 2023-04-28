const searchImage = async () => {
  await axios
    .get(
      "https://api.unsplash.com/photos/?client_id=jAfmUZreaAkTviwC88pRB9ZY_dMqmjqiA0FYw8CJCWc"
    )
    .then(function (response) {
      console.log(response.data[0].user.name);
      console.log(response.data[0].urls);
      document.getElementById(
        "main"
      ).style.backgroundImage = `url(${response.data[0].urls.regular})`;
      document.getElementById("credit").innerHTML =
        "Credit: " + response.data[0].user.name;
    })
    .catch(function (error) {
      console.log(error);
    });
};

var now = new Date();
var currentDate = now.toLocaleDateString();
var currentTime = now.toLocaleTimeString();

document.getElementById("date").innerHTML = currentDate;
document.getElementById("time").innerHTML = currentTime;

const successCallback = (position) => {
  const options = {
    method: "GET",
    url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
    params: { lat: position.coords.latitude, lon: position.coords.latitude },
    headers: {
      "X-RapidAPI-Key": "449a5f087emsh2bfed34a11a9a0ep131709jsn237019db1123",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);

      document.getElementById("temper").innerHTML = response.data.temp + " C";
      document.getElementById("temp").innerHTML =
        "Temperature " + response.data.temp;
      document.getElementById("winddegrees").innerHTML =
        "wind degrees " + response.data.wind_degrees;
      document.getElementById("windspeed").innerHTML =
        "wind speed " + response.data.wind_speed;
    })
    .catch(function (error) {
      console.error(error);
    });
  console.log(position.coords);
};

const errorCallback = (error) => {
  console.log(position);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

searchImage();
