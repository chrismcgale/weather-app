const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
  return console.log("Please Return an address")
}

geoCode(address, (error, {latitude, longitude, location} = {}) => {
  if (error) {
    return console.log('Error:', error)
  }

  forecast(latitude, longitude, (error, forecastData) => {
    if(error) {
      console.log('Error', error)
    }

    console.log(`Location: ${location}`)
    console.log(forecastData)
  })
})

