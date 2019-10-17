(function() {
 
  $("#submitForm").click(function () {
    const searchLocation = $("#searchBar").val();

    geocode(searchLocation);

    $("#searchBar").val("");

  });

  $(document).on("click", "button#remove", function () {
    let parentDiv = $(this).parent();
    let weatherCardContainer = parentDiv.parent();
    weatherCardContainer.remove();
    
  });


})();
//Function to connect to the Dark Sky API
function getWeatherInfo(latitude, longitude, city, state) {
  //https://api.darksky.net/forecast/73df02eb733faad1b783530f33626c95/37.8267,-122.4233
  //BaseAPI/APIKey/Lat,Long

  $.ajax(
    "https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," +longitude,
    { dataType: "jsonp" }
  )
    .done(function(data) {
      
      let templateHTML = $("#template").html();
      let temperature = data.currently.temperature;
      let conditions = data.currently.summary;
      let currentDayInfo = data.daily.data[0];
      let highTemp = currentDayInfo.temperatureHigh;
      let lowTemp = currentDayInfo.temperatureLow;
      let precipChance = currentDayInfo.precipProbability;

      templateHTML = templateHTML.replace("@@city@@", city);
      templateHTML = templateHTML.replace("@@currentTemp@@", Math.round(temperature));
      templateHTML = templateHTML.replace("@@cityState@@", city + " " + state);
      templateHTML = templateHTML.replace("@@conditions@@", conditions);

      templateHTML = templateHTML.replace("@@highTemp@@", Math.round(highTemp));
      templateHTML = templateHTML.replace("@@lowTemp@@", Math.round(lowTemp));
      templateHTML = templateHTML.replace("@@precipChance@@", precipChance * 100);


      


      //add the configured template to our row in the card container
      $(".row").append(templateHTML)



    })
    .fail(function(error) {
      console.log(error);
    })
    .always(function() {
      console.log("weather call complete");
    });
}
//Function to connect to the GeoCode API
function geocode(location) {
  // Base URL + API KEY + & Location+ + address
  $.ajax(
    "http://www.mapquestapi.com/geocoding/v1/address?key=" + geoCodeKey + "&location=" + location
  )
    .done(function(data) {
      let locations = data.results[0].locations[0]

      let lat = locations.latLng.lat;

      let lng = locations.latLng.lng;

      let city = locations.adminArea5;
      let state = locations.adminArea3;

      getWeatherInfo(lat, lng, city, state);

      


    })
    .fail(function(error) {
      console.log(error);
    })
    .always(function() {
      console.log("GeoCode call complete");
    });
}
