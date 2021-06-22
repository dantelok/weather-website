const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const post = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // use only if you don't use the name 'views'
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dante Lok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dante Lok'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Dante can help you',
        name: 'Dante Lok'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    else {
        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send({
                    error: 'Unable to connect!'
                })
            }
            forecast(latitude, longitude ,(error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'Unable to find location, try another search!'
                    })
                }
                 res.send({
                    forecast: forecastData,
                    location: location
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Dante Lok",
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Dante Lok",
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})