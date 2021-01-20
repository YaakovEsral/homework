import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//@ts-ignore
import { api_key } from './shared/api_key';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    zip = null;
    weatherData: any = null;

    constructor(private httpClient: HttpClient) { }

    getWeather(zip: any) {
        if (zip.length === 5) {
            console.log(zip);
            this.httpClient.get<any[]>(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api_key}&units=imperial`)
                .subscribe(weather => {
                    this.weatherData = weather;
                });
        }
    }
}

