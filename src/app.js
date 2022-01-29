const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

//express server
// domain: app.com
const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Magdeline",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Magdeline",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Magdeline",
  });
});

//1 domain has a lot of routes
//4 routes

// app.get('/help', (req, res) => {
// //send an object
// res.send({
//     name: 'Andrew',
//     age: 27
// })
//send an array of json objects
// res.send([{
//     name: 'Andrew'
// }, {
//     name: 'Sarah'
// }])
// })

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastdata) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastdata,
            location,
            address: req.query.address,
          });
        });
      }
    );
    // res.send({
    //   forecast: "It is snowing",
    //   location: "Philadelphia",
    //   address: req.query.address,
    // });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  } else {
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Magdeline",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Magdeline",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
