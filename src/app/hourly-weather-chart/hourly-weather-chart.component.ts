import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import {WeatherDataServiceService} from '../weather-data-service.service';

// import HC_More from 'highcharts/highcharts-more';
// HC_More(Highcharts);
//
// import Windbarb from 'highcharts/modules/windbarb';
// Windbarb(Highcharts);
//
// import Pattern_Fill from 'highcharts/modules/pattern-fill';
// Pattern_Fill(Highcharts);
//
// import Data from 'highcharts/modules/pattern-fill';
// Data(Highcharts);

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/windbarb')(Highcharts);
require('highcharts/modules/pattern-fill')(Highcharts);


@Component({
  selector: 'app-hourly-weather-chart',
  templateUrl: './hourly-weather-chart.component.html',
  styleUrls: ['./hourly-weather-chart.component.css']
})
export class HourlyWeatherChartComponent implements OnInit {

  humidity: any;
  winds: any;
  temperatures: any;
  pressures: any;
  date: any;

  // Initialize
  json: any;
  container: any;
  chart: any;


  constructor(private weatherDataServiceService: WeatherDataServiceService) { }



  ngOnInit(): void {

    this.humidity = [];
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];
    this.date = [];

    this.container = 'container';

    this.weatherDataServiceService.eventEmit.subscribe(value => {
      this.json = this.weatherDataServiceService.hourlyWeatherData;
    });

    this.json = this.weatherDataServiceService.hourlyWeatherData;

    this.parse();
  }

  parse(): void {
    // tslint:disable-next-line:prefer-const
    let pointStart;
    const rawData = this.json.data.timelines[0].intervals;

    for (let i = 0; i < rawData.length; ++i) {
      const x = new Date(Date.parse(rawData[i].startTime));
      this.date.push(x);

      this.temperatures.push({
        x,
        y: rawData[i].values.temperature
      });
      this.humidity.push({
        x,
        y: rawData[i].values.humidity
      });
      if (i % 2 === 0) {
        this.winds.push({
          x,
          value: rawData[i].values.windSpeed,
          direction: rawData[i].values.windDirection
        });
      }
      this.pressures.push({
        x,
        y: rawData[i].values.pressureSeaLevel
      });
    }

    this.createChart();

  }

  createChart(): void {
    this.chart = new Highcharts.Chart(this.getChartOptions(), chart => {
      this.onChartLoad(chart);
    });
    console.log('绘制每小时天气图', this);
  }

  onChartLoad(chart: any): void {
    this.drawBlocksForWindArrows(chart);
  }

  drawBlocksForWindArrows(chart: any): void {
    const xAxis = chart.xAxis[0];

    for (
      let pos = xAxis.min, max = xAxis.max, i = 0;
      pos <= max + 36e5; pos += 36e5,
        i += 1
    ) {

      // Get the X position
      const isLast = pos === max + 36e5;
      const x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

      // Draw the vertical dividers and ticks
      // const isLong = this.resolution > 36e5 ?
      //   pos % this.resolution === 0 :
      //   i % 2 === 0;
      const isLong = i % 2 === 0;

      chart.renderer
        .path([
          'M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
          'L', x, chart.plotTop + chart.plotHeight + 32,
          'Z'
        ])
        .attr({
          stroke: chart.options.chart.plotBorderColor,
          'stroke-width': 1
        })
        .add();
    }

    // Center items in block
    chart.get('windbarbs').markerGroup.attr({
      translateX: chart.get('windbarbs').markerGroup.translateX + 8
    });

  }


  getChartOptions(): any {
    return {
      chart: {
        renderTo: this.container,
        marginBottom: 70,
        marginRight: 40,
        marginTop: 50,
        plotBorderWidth: 1,
        height: 310,
        alignTicks: false,
        scrollablePlotArea: {
          minWidth: 720
        }
      },

      title: {
        text: 'Hourly weather (For next 5 Days)',
        align: 'center',
        style: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      },

      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat:
          '<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
          '<b>{point.point.symbolName}</b><br>'

      },

      xAxis: [{ // Bottom X axis
        type: 'datetime',
        tickInterval: 2 * 36e5, // two hours
        minorTickInterval: 36e5, // one hour
        tickLength: 0,
        gridLineWidth: 1,
        gridLineColor: 'rgba(128, 128, 128, 0.1)',
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        offset: 30,
        showLastLabel: true,
        labels: {
          format: '{value:%H}'
        },
        crosshair: true
      }, { // Top X axis
        linkedTo: 0,
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
        labels: {
          format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
          align: 'left',
          x: 3,
          y: -5
        },
        opposite: true,
        tickLength: 16,
        gridLineWidth: 1
      }],

      yAxis: [{ // temperature axis
        title: {
          text: null
        },
        labels: {
          format: '{value}°',
          style: {
            fontSize: '10px'
          },
          x: -3
        },
        plotLines: [{ // zero plane
          value: 0,
          color: '#BBBBBB',
          width: 1,
          zIndex: 2
        }],
        maxPadding: 0.3,
        minRange: 8,
        tickInterval: 1,
        gridLineColor: 'rgba(128, 128, 128, 0.1)'

      }, { // precipitation axis
        title: {
          text: null
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
        tickLength: 0,
        minRange: 10,
        min: 0

      }, { // Air pressure
        allowDecimals: false,
        title: { // Title on top of axis
          text: 'inHg',
          offset: 0,
          align: 'high',
          rotation: 0,
          style: {
            fontSize: '10px',
            color: '#ffc973'
          },
          textAlign: 'left',
          x: 3
        },
        labels: {
          style: {
            fontSize: '8px',
            color: '#ffc973'
          },
          y: 2,
          x: 3
        },
        gridLineWidth: 0,
        opposite: true,
        showLastLabel: false
      }],

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          pointPlacement: 'between'
        }
      },


      series: [{
        name: 'Temperature',
        data: this.temperatures,
        type: 'spline',
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true
            }
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
            '{series.name}: <b>{point.y}°C</b><br/>'
        },
        zIndex: 1,
        color: '#FF3333',
        negativeColor: '#48AFE8'
      },

        {
          name: 'Humidity',
          data: this.humidity,
          type: 'column',
          color: '#68CFE8',
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          grouping: false,
          dataLabels: {
            // enabled: !this.hasPrecipitationError,
            filter: {
              operator: '>',
              property: 'y',
              value: 0
            },
            style: {
              fontSize: '8px',
              color: 'gray'
            }
          },
          tooltip: {
            valueSuffix: ' %'
          }
        },
        {
          name: 'Air pressure',
          // color: Highcharts.getOptions().colors[2],
          data: this.pressures,
          color: '#feb43e',
          marker: {
            enabled: false
          },
          shadow: false,
          tooltip: {
            valueSuffix: ' hPa'
          },
          dashStyle: 'shortdot',
          yAxis: 2
        }, {
          name: 'Wind',
          type: 'windbarb',
          id: 'windbarbs',
          color: Highcharts.getOptions().colors[1],
          lineWidth: 1.5,
          data: this.winds,
          vectorLength: 18,
          yOffset: -15,
          tooltip: {
            valueSuffix: ' m/s'
          }
        }]
    };
  }

}
