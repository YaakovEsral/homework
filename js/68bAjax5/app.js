// https://openweathermap.org/weather-conditions

(function () {
    'use strict';
    function get(id) {
        return document.getElementById(id);
    }

    const locationKey = 'dfe8c72f67538b&lat';
    const weatherKey = 'fb79b6e6b1199c27455668afe998b540';

    const spinner = document.getElementsByClassName('spinner');
    const spinners = Array.from(spinner);

    const localeWeatherInfo = get('localeWeatherInfo');
    const zmanimInfo = get('zmanimInfo');
    // const form = get('form');
    const dropdownOptions = get('dropdownOptions');
    const textInput = get('textInput');
    // const weatherBtn = get('weatherBtn');
    const latLongInputs = document.getElementsByClassName('latLongInput');

    let lat, long;
    let locationData;
    let weatherData;
    let zmanimData;

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(findGeo, 1);
    } else {
        document.addEventListener('DOMContentLoaded', findGeo);
    }

    dropdownOptions.addEventListener('change', () => {
        console.log(latLongInputs);
        for (let i = 0; i < latLongInputs.length; i++) {
            
            latLongInputs[i].hidden = dropdownOptions.value !== 'latLong';
            // latLongInputs[i].style.display = 'none';
            // latLongInputs[i].style.display = true;
        }
        textInput.hidden = dropdownOptions.value === 'latLong';
    });

    // weatherBtn.addEventListener('click', findGeo);
    // form.onsubmit = (e =>{
    //     e.preventDefault();
    //     console.log('form submitted');
    // });

    function findGeo() {
        if (!navigator.geolocation) {
            console.log('Sorry, your browser doesn\'t support geolocation.');
        } else {
            navigator.geolocation.getCurrentPosition(success, failure);
        }

        async function success(position) {
            console.log('Locating...');

            lat = position.coords.latitude;
            long = position.coords.longitude;

            let locationUrl = `https://us1.locationiq.com/v1/reverse.php?key=${locationKey}=${lat}&lon=${long}&format=json`;
            let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherKey}&units=imperial`;
            let zmanimUrl = 'https://cors-anywhere.herokuapp.com/' + `https://wyrezmanim.herokuapp.com/api/zmanim?timezone=America/New_York&latitude=${lat}&longitude=${long}&mode=basic&elevation=50&format=json`;

            locationData = await executeFetch(locationUrl);
            weatherData = await executeFetch(weatherUrl);
            zmanimData = await executeFetch(zmanimUrl);

            appendData(locationData, weatherData, zmanimData);
        }

        function failure() {
            console.log('We were unable to retrieve your geolocation.');
        }

    }

    function executeFetch(url) {
        return fetch(url)
            .then(r => {
                if (!r.ok) {
                    throw new Error(r.status, r.statusText);
                }
                return r.json();
            })
            // .then(data => {
            //     // console.log(data);
            //     return data;
            // })
            .catch(err => {
                console.error(err);
            });
    }

    function appendData(locationData, weatherData, zmanimData) {
        const a = locationData.address;
        const now = new Date();
        spinners.forEach(elem => elem.classList.add('hidden'));
        // classList.add('hidden');
        const weatherHeader = '<h3>Weather:</h3>';
        localeWeatherInfo.innerHTML += weatherHeader;
        localeWeatherInfo.innerHTML += (`<p>Displaying info for ${a.city}, ${a.state} on ${now.toLocaleString()}.</p>`);

        let weatherDataArray = [];
        weatherDataArray.push({ key: 'Temperature', val: weatherData.main.temp + ' F' });
        weatherDataArray.push({ key: 'Feels like', val: weatherData.main.feels_like + ' F' });
        // dataArray.push({key: 'Location', val: weatherData.name});
        weatherDataArray.push({ key: 'Description', val: weatherData.weather[0].description });
        weatherDataArray.push({ key: 'Wind Speed', val: weatherData.wind.speed });


        for (let i = 0; i < weatherDataArray.length; i++) {
            const elem = `<p>${weatherDataArray[i].key}: ${weatherDataArray[i].val}</p>`;
            localeWeatherInfo.innerHTML += elem;
        }
        localeWeatherInfo.innerHTML += '<br>';

        let zmanimDataArray = [];

        zmanimDataArray.push({ key: 'Alos 16.1\u00B0', val: zmanimData.Alos16point1Degrees });
        zmanimDataArray.push({ key: 'Sunrise', val: zmanimData.Sunrise });
        zmanimDataArray.push({ key: 'Sof Zman Krias Shema (Gra)', val: zmanimData.SofZmanShemaGra });
        zmanimDataArray.push({ key: 'Sof Zman Krias Shema (MG"A)', val: zmanimData.SofZmanShemaMGA });
        zmanimDataArray.push({ key: 'Sof Zman Tefilah (Gra)', val: zmanimData.SofZmanTefilahGra });
        zmanimDataArray.push({ key: 'Sof Zman Tefilah (MG"A)', val: zmanimData.SofZmanTefilahMGA });
        zmanimDataArray.push({ key: 'Chatzos', val: zmanimData.Chatzos });
        zmanimDataArray.push({ key: 'Mincha Gedolah ', val: zmanimData.MinchaGedolah });
        zmanimDataArray.push({ key: 'Plag Hamincha', val: zmanimData.PlagHamincha });
        zmanimDataArray.push({ key: 'Shkia', val: zmanimData.Shkia });
        zmanimDataArray.push({ key: 'Tzais Hakochavim', val: zmanimData.Tzais });
        if (now.toDateString().includes('Fri')) {
            zmanimDataArray.push({ key: 'Candle Lighting', val: zmanimData.CandleLighting });
        }

        const zmanimHeader = '<h3>Zmanim:</h3>';
        zmanimInfo.innerHTML += zmanimHeader;
        for (let i = 0; i < zmanimDataArray.length; i++) {
            const elem = `<p>${zmanimDataArray[i].key}: ${zmanimDataArray[i].val}</p>`;
            zmanimInfo.innerHTML += elem;
        }
    }
}());