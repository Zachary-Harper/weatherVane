(function() {
 
  $("#submit").click(function () {
    const searchLocation = $("#searchBar").val();

    geocode(searchLocation);

    $("#searchBar").val("");


  });

})();
//Function to connect to the Dark Sky API
function getWeatherInfo() {
  //https://api.darksky.net/forecast/73df02eb733faad1b783530f33626c95/37.8267,-122.4233
  //BaseAPI/APIKey/Lat,Long

  $.ajax(
    "https://api.darksky.net/forecast/" + darkSkyKey + "/37.8267,-122.4233",
    { dataType: "jsonp" }
  )
    .done(function(data) {
      console.log(data);
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
      console.log(data);
    })
    .fail(function(error) {
      console.log(error);
    })
    .always(function() {
      console.log("GeoCode call complete");
    });
}
