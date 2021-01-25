import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WeatherDisplayComponent } from './weather/weather-display/weather-display.component';

const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
        pathMatch: 'full'
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
        pathMatch: 'full'
    },
    {
        path: 'weather/:zip',
        component: WeatherDisplayComponent
    }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
