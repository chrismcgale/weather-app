const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Config app
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        author: "Chris McGale"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Chris McGale'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        helpText: "Some helpful text",
        author: 'Chris McGale'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
  
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
        }
  
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: "404",
        errorMessage: "Help Article Not Found",
        author: "Chris McGale"
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: "404",
        errorMessage: "Page Not Found",
        author: "Chris McGale"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})