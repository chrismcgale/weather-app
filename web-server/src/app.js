const path = require('path')
const express = require('express')

const app = express()

// Define paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')


// Config app
app.set('view engine', 'hbs')
app.set('views', viewsPath)

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
        helpText: "Some helpful text"
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Toronto'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})