const request = require("request");
const geoCode = (place, callBack) => {
  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(place) +
    ".json?access_token=pk.eyJ1IjoibWFubWF5YSIsImEiOiJja3NseGFkbXQwMWlwMnBwN29nYWgzMXk0In0.7U1hIofivUYjX7QP_zEWog";
  request({ url:url2, json: true }, (error, {body} = {}) => {// since the variable and property name differs , cant use defactoring here
    if (error) {
      callBack("something happened", undefined);
    } 
    else if (body.message) {
      callBack("something wrong with the access, pleae check!", undefined);
    }
     else if (body.features.length == 0) {
      callBack(
        "something wrong with the request, check the data again",
        undefined
      );
    } else {
      callBack(
        undefined,
          {longitude: body.features[0].center[1], latitude: body.features[0].center[0]}
      );
    }
  });
};

const forecast = (lat, long, callBack) => {
  const url =
    "http://api.weatherstack.com/current?access_key=82be35a886edf167b87a772481dc9a20&query="+lat+","+long;
  request({ url, json: true }, function (error, {body}) {// object refactoring/ destructuring and url destucturing
    if (error) {
      callBack("something happened", undefined);
    } else if (body.error) {
      callBack(
        "something wrong with the request, check the data again",
        undefined
      );
    } else {
      const data = body;
      callBack(
        undefined,
        "it is " +
          data.current.weather_descriptions[0] +
          ". the tempt is " +
          data.current.temperature +
          " with humidity " +
          data.current.humidity +
          " at "+ data.location.name +" "+data.location.region +" "+data.location.country
      );
    }
  });
};
module.exports.foreCast = forecast;
module.exports.geoCode = geoCode;
