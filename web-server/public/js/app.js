console.log('Client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loc = document.getElementById("location")
const fore = document.getElementById("forecast")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    loc.textContent = "Loading..."
    fore.textContent = ""

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return loc.textContent = data.error
        }
        loc.textContent = data.location
        fore.textContent = data.forecast
    })
    })
})

