import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BlankComponent } from './blank/blank.component';
import { DailyWeatherListComponent } from './daily-weather-list/daily-weather-list.component';
import { DailyWatherDetailsComponent } from './daily-wather-details/daily-wather-details.component';
import { DailyTemperatureChartComponent } from './daily-temperature-chart/daily-temperature-chart.component';
import { HourlyWeatherChartComponent } from './hourly-weather-chart/hourly-weather-chart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ResultsComponent } from './results/results.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ProgressBarComponent,
    ProgressBarComponent,
    BlankComponent,
    DailyWeatherListComponent,
    DailyWatherDetailsComponent,
    DailyTemperatureChartComponent,
    HourlyWeatherChartComponent,
    FavoriteComponent,
    ResultsComponent,
    WeatherInfoComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_ojwI96rsE2bDCU5tyH0eUDeSuCmPveM'
    }),
    RouterModule.forRoot([
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

