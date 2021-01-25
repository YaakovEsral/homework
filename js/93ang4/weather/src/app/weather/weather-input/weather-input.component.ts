import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-input',
  templateUrl: './weather-input.component.html',
  styleUrls: ['./weather-input.component.css']
})
export class WeatherInputComponent {
    zip = null;

    constructor(private router: Router, private route:ActivatedRoute) { }

    getWeather(zip: any) {
        this.router.navigate(['weather', zip]);
    }

}
