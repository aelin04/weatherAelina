const inp = document.querySelector('#inp')
const mainInfo = document.querySelector('.main__info')
const mainRight = document.querySelector('.main__right')
const days = document.querySelector('.days')


let city = 'Bishkek'

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        city = inp.value;
        inut()
        inp.value = ''
    }
})

function inut() {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aba7a278f30c9a790896389b63786af1`
    fetch(URL)
        .then((resp) => { return resp.json() })
        .then(data => {
            const name = document.createElement('h2')
            name.innerHTML = `${data.name}`
            mainInfo.append(name)

            const temp = document.createElement('h3')
            temp.innerHTML = Math.round(data.main.temp - 273) + '&deg'
            mainInfo.append(temp)

            const icon = document.createElement('div')
            icon.innerHTML = `<img class='weather-img' src="https://openweathermap.org/img/w/${data.weather[0].icon}.png "></img>`
            mainInfo.append(icon)

            const desk = document.createElement('span')
            desk.innerHTML = `${data.weather[0].description}`
            mainInfo.append(desk)


            function formattedTime(n) {
                let unix_date = n
                let date = new Date(unix_date * 1000);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let formattedTime = hours + ':' + minutes.substr(-2);
                return formattedTime
            }

            const sunrise = document.createElement('h4')
            sunrise.innerHTML = `<i class="fal fa-sunrise"></i>Sunrise: ${formattedTime(`${data.sys.sunrise}`)}`
            mainInfo.append(sunrise)
            
            const sunset = document.createElement('h4')
            sunset.innerHTML = `<i class="fal fa-sunset"></i>Sunset: ${formattedTime(`${data.sys.sunset}`)}`
            mainInfo.append(sunset)

            const feels = document.createElement('h3')
            feels.innerHTML = '<span>feels like:</span> ' + Math.round(data.main.feels_like - 273) + '&deg' + '<hr>'
            mainRight.append(feels)

            const pressure = document.createElement('span')
            pressure.innerHTML = `<i class="fal fa-arrow-down"></i>pressure: ${data.main.pressure}mbar <hr>`
            mainRight.append(pressure)

            const humidity = document.createElement('span')
            humidity.innerHTML = `<i class="fal fa-dewpoint"></i>humidity: ${data.main.humidity}% <hr>`
            mainRight.append(humidity)

            const wind = document.createElement('span')
            wind.innerHTML = `<i class="fal fa-wind"></i>wind: ${data.wind.speed}meter/sec <hr>`
            mainRight.append(wind)

            const clouds = document.createElement('span')
            clouds.innerHTML = `<i class="fal fa-clouds"></i>clouds: ${data.clouds.all}%`
            mainRight.append(clouds)
        })
    mainInfo.innerHTML = ''
    mainRight.innerHTML = ''

}

inut()






