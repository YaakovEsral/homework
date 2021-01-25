import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//@ts-ignore
import { api_key } from '../../shared/api_key';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {

    // @Input() weatherData: any;
    weatherData!: any;

    constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
      this.route.params.subscribe(data =>{
        //   console.log(data);
        this.getWeather(data.zip)
      })
  }

  getWeather(zip: string) {
    if (zip.length === 5) {
        console.log(zip);
        this.httpClient.get<any[]>(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api_key}&units=imperial`)
            .subscribe(weather => {
                this.weatherData = weather;
            });
    }
  }

  getDate() {
      return new Date();
  }

}
