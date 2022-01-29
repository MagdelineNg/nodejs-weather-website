const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9c098bd4e15253360a8fd07aeaa3a92f&query=" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(latitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. The humidity is " +
          body.current.humidity +
          "%"
      );
    }
  });
};

module.exports = forecast;
