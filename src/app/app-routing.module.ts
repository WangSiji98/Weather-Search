import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFormComponent } from './search-form/search-form.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BlankComponent } from './blank/blank.component';
import { DailyWeatherListComponent } from './daily-weather-list/daily-weather-list.component';
import { DailyWatherDetailsComponent } from './daily-wather-details/daily-wather-details.component';
import { DailyTemperatureChartComponent } from './daily-temperature-chart/daily-temperature-chart.component';
import { HourlyWeatherChartComponent } from './hourly-weather-chart/hourly-weather-chart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ResultsComponent } from './results/results.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: SearchFormComponent, children: [
      { path: 'result', component: ResultsComponent,
        children: [
          {path: 'error', component: ErrorComponent},
          {path: 'blank', component: BlankComponent},
          {path: 'progress', component: ProgressBarComponent},
          {path: 'weather-info', component: WeatherInfoComponent,
            children: [
              {path: 'daily-weather-list', component: DailyWeatherListComponent},
              {path: 'daily-temperature-chart', component: DailyTemperatureChartComponent},
              {path: 'hourly-weather-chart',  component: HourlyWeatherChartComponent}
            ], data: { animation: 'List' }
          },
          {path: 'daily-weather-details/:index', component: DailyWatherDetailsComponent, data: { animation: 'Details' }}
        ]
      },
      {path: 'favorite', component: FavoriteComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
