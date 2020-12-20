import React, { Component } from 'react';

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherData: null,
            error: false,
            errorMessage: null
        }
    }

    getWeather() {
        const zip = document.getElementById('zipInput').value;
        //see keys.txt file for key. REMOVE BEFORE COMMITTING
        const weatherKey = '';
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${weatherKey}&units=imperial`;

        fetch(weatherUrl)
            .then(r => {
                if (!r.ok) {
                    // console.log(r);
                    this.setState({
                        error: `ERROR - type ${r.status}`,
                        errorMessage: r.statusText
                    })    
                    throw new Error(r.response, r.responseText)
                }
                return r.json();
            })
            .then(data => {
                // console.log(data);
                this.setState({
                    weatherData: data,
                    error: false,
                    errorMessage: null
                });
            })
            .catch(e => {
                console.log('error', e);
            })
    }

    render() {
        const input =
            <div className="container flex-center text-center mt-4 mx-auto mb-4">
                <h3>Enter a zip code:</h3>
                <input id="zipInput" type="text" maxLength="5" />
                <button onClick={() => {
                    this.getWeather()
                }
                }>Get Weather</button>
            </div>;

        const info = this.state.weatherData;
        const display = this.state.error ?  //if there's an error, display the error
            <div className="container text-center text-danger">
                <h2>{this.state.error}: {this.state.errorMessage}</h2>
            </div> : //else if there is info, display the info
            info !== null ?
                <div className="container text-center">
                    <h2><u>Displaying info for {info.name} <br></br> at {new Date().toLocaleTimeString()}</u></h2>
                    <h3>Temperature: {info.main.temp || ''}</h3>
                    <h3>Humidity: {info.main.humidity}</h3>
                    <h3>Description: {info.weather[0].description}</h3>
                    <h3>Wind speed: {info.wind.speed}</h3>
                </div> : //else, display null 
                null;

        return (
            <>
                {input}
                {display}
            </>
        )
    }

}