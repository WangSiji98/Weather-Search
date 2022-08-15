import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {WeatherDataServiceService} from '../weather-data-service.service';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
// require('highcharts/modules/solid-gauge')(Highcharts);
// require('highcharts/modules/heatmap')(Highcharts);
// require('highcharts/modules/treemap')(Highcharts);
// require('highcharts/modules/funnel')(Highcharts);


@Component({
  selector: 'app-daily-temperature-chart',
  templateUrl: './daily-temperature-chart.component.html',
  styleUrls: ['./daily-temperature-chart.component.css']
})
export class DailyTemperatureChartComponent implements OnInit {

  tempData: any;

  constructor(private weatherDataServiceService: WeatherDataServiceService) {
  }

  ngOnInit(): void{

    this.weatherDataServiceService.eventEmit.subscribe(value => {
      this.tempData = this.weatherDataServiceService.dailyTempData;
    });

    this.tempData = this.weatherDataServiceService.dailyTempData;
    this.plot();
    this.plot();
  }

  plot(): void {
    const options: any = {
      chart: {
        type: 'arearange',
        zoomType: 'x',
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
        }
      },

      title: {
        text: 'Temperature Ranges (Min, Max)'
      },

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e %b',
        },
        accessibility: {
          rangeDescription: 'Range: Jan 1st 2017 to Dec 31 2017.'
        }
      },

      yAxis: {
        title: {
          text: null
        }
      },

      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '°C',
        xDateFormat: '%A, %b %e'
      },

      legend: {
        enabled: false
      },

      series: [{
        name: 'Temperatures',
        data: this.tempData
      }],

      plotOptions: {
        series: {
          fillColor: {
            linearGradient: [0, 0, 0, 150],
            stops: [
              [0, Highcharts.color('#f8aa32').get('rgba')],
              // [0.5, Highcharts.color("#ffffff").get('rgba')],
              [1, Highcharts.color('#dae6f3').get('rgba')],
            ]
          }
        }
      },
    };

    Highcharts.chart('container2', options);
    console.log('绘制每日温度图', this);
  }

}
