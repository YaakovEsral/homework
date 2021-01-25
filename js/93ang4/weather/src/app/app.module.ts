import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDisplayComponent } from './weather/weather-display/weather-display.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherInputComponent } from './weather/weather-input/weather-input.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent,
    NavBarComponent,
    HeaderComponent,
    AboutComponent,
    ContactUsComponent,
    WeatherComponent,
    WeatherInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
