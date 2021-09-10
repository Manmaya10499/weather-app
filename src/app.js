const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getUtils = require("./utils/utils");
const app = express();
app.use(express.static(path.join(__dirname, '/public')))

const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
app.set('view engine', 'hbs');
app.set("views", templatePath);
hbs.registerPartials(partialPath);


app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "kuchh vi",
    data: "vi can be written as v",
    createdBy: "sucky suckerson",
  });
});

app.get("/home", (req, res) => {
  res.render("index.hbs", {
    title: "kuchh vi",
    data: "vi can be written as v",
    createdBy: "sucky suckerson",
  });
});

//No need of this snippet anymore
// app.get('',(req,res)=>{
//     res.send("<h1>zzzzzzzzzz</h1>");
// })

// app.use(express.static(pathName));

// app.get('/day',(req,res)=>{
//     res.send({
//         name:"oigfhjerighe",
//         age:12
//     });
// })
// app.get('/help',(req,res)=>{
//     res.send("not much help can be offered");
// })

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "about",
    data: "mohe ... nahi ayi",
    createdBy: "sucky suckerson"
  });
});
app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "helping",
    data: "lelo lelo",
    createdBy: "sucky suckerson"
  });
});
app.get("help/*", (req, res) => {
  res.render("error.hbs", {
    title: "404",
    data: "CAN'T FIND THE ARTICLEE",
    createdBy: "sucky suckerson"
  });
});
// app.get("/*", (req, res) => {
//   res.render("error.hbs", {
//     title: "404",
//     data: "page not found",
//     createdBy: "sucky suckerson"
//   });
// });
app.get("/help/*", (req, res) => {
  res.render("error.hbs", {
    title: "404",
    data: "CAN'T FIND THE ARTICLE",
    createdBy: "sucky suckerson"
  });
});

app.get("/weather", (req, res) => {
  if(req.query.address == undefined || req.query.address == ''){
    return res.send({
      error: "plz enter a valid address"
    })
  }
  getUtils.geoCode(req.query.address, (error, { longitude, latitude } = {}) => {
    //defactoring
    if (error) {
      return res.send({ error });
    }
    getUtils.foreCast(longitude, latitude, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});


app.listen(3000, () => {
  // console.log("server is up and running");
});



