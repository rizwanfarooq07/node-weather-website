//jshint esversion:6
const path = require(`path`);
const express = require(`express`);
const forecast = require(`./utils/forecast`);
const geocode = require(`./utils/geocode`);

const app = express();
const publicDirectoryPath = path.join(__dirname, `../public`);

app.set(`view engine`, `ejs`)
app.use(express.static(publicDirectoryPath))

app.get("/", (req, res) => {
    res.render(`index`, {
        mainTitle: `Weather`,
        title: `Weather App`,
        name: `Rizwan Farooqui`
    })
});

app.get(`/weather`, (req, res) => {
    if(!req.query.address){
        return res.send({
            error: `You must provide an address`
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
    
    
    
    // res.send({
    //     forecast: `It is snowing`,
    //     location: req.query.address
    // })
});

app.get("/about", (req, res) => {
    res.render(`about`, {
        mainTitle: `About`,
        title: `About`,
        name: `Rizwan Farooqui`
    })
});

app.get("/help", (req, res) => {
    res.render(`help`, {
        mainTitle: `Help`,
        title: `Help`,
        helpText: `Here is some helpful text`,
        name: `Rizwan Farooqui`
    })
});

app.get(`/help/*`, (req, res) => {
    res.render(`404`, {
        title: `404`,
        name: `Rizwan Farooqui`,
        errorMessage: `Help article not found`
    })
});

app.get(`*`, (req, res) => {
    res.render(`404`, {
        mainTitle: `Error`,
        title: `404`,
        name: `Rizwan Farooqui`,
        errorMessage: `Page not found`
    })
});

app.listen("3000", () => {
    console.log("Server is running on port 3000");
})