import { Component, OnInit, Input } from '@angular/core';
import {WeatherDataServiceService} from '../weather-data-service.service';

@Component({
  selector: 'app-daily-weather-list',
  templateUrl: './daily-weather-list.component.html',
  styleUrls: ['./daily-weather-list.component.css']
})
export class DailyWeatherListComponent implements OnInit {

  constructor(private weatherDataServiceService: WeatherDataServiceService) { }

  // 天气代码与天气名称以及天气图片URL的转换
  weatherCodeMap = new Map([
    ['4201', ['Heavy Rain', ['../../assets/img/rain_heavy.svg']]],
    ['4001', ['Rain', ['../../assets/img/rain.svg']]],
    ['4200', ['Light Rain', ['../../assets/img/rain_light.svg']]],
    ['6201', ['Heavy Freezing Rain', ['../../assets/img/freezing_rain_heavy.svg']]],
    ['6001', ['Freezing Rain', ['../../assets/img/freezing_rain.svg']]],
    ['6200', ['Light Freezing Rain', ['../../assets/img/freezing_rain_light.svg']]],
    ['6000', ['Freezing Drizzle', ['../../assets/img/freezing_drizzle.svg']]],
    ['4000', ['Drizzle', ['../../assets/img/drizzle.svg']]],
    ['7101', ['Heavy Ice Pellets', ['../../assets/img/ice_pellets_heavy.svg']]],
    ['7000', ['Ice Pellets', ['../../assets/img/ice_pellets.svg']]],
    ['7102', ['Light Ice Pellets', ['../../assets/img/ice_pellets_light.svg']]],
    ['5101', ['Heavy Snow', ['../../assets/img/snow_heavy.svg']]],
    ['5000', ['Snow', ['../../assets/img/snow.svg']]],
    ['5100', ['Light Snow', ['../../assets/img/snow_light.svg']]],
    ['5001', ['Flurries', ['../../assets/img/flurries.svg']]],
    ['8000', ['Thunderstorm', ['../../assets/img/tstorm.svg']]],
    ['2100', ['Light Fog', ['../../assets/img/fog_light.svg']]],
    ['2000', ['Fog', ['../../assets/img/fog.svg']]],
    ['1001', ['Cloudy', ['../../assets/img/cloudy.svg']]],
    ['1102', ['Mostly Cloudy', ['../../assets/img/mostly_cloudy.svg']]],
    ['1101', ['Partly Cloudy', ['../../assets/img/partly_cloudy_day.svg', '../../assets/img/partly_cloudy_night.svg']]],
    ['1100', ['Mostly Clear', ['../../assets/img/mostly_clear_day.svg', '../../assets/img/mostly_clear_night.svg']]],
    ['1000', ['Clear Sunny', ['../../assets/img/clear_day.svg', '../../assets/img/clear_night.svg']]],
    ['3000', ['Light Wind', ['../../assets/img/light_wind.png']]],
    ['3001', ['Wind', ['../../assets/img/wind.png']]],
    ['3002', ['Strong Wind', ['../../assets/img/stong_wind.png']]],
  ]);

  monthMap = new Map([
    ['01', 'Jan'],
    ['02', 'Feb'],
    ['03', 'Mar'],
    ['04', 'Apr'],
    ['05', 'May'],
    ['06', 'Jun'],
    ['07', 'Jul'],
    ['08', 'Aug'],
    ['09', 'Sep'],
    ['10', 'Oct'],
    ['11', 'Nov'],
    ['12', 'Dec'],
  ]);



  weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  weatherListData: any;

  getDate(jsonString: string): string {
    let res = '';
    const dataString = jsonString.substr(0, 4) + '/' + jsonString.substr(5, 2) + '/' + jsonString.substr(8, 2);
    const myDate = new Date(Date.parse(dataString));
    res += this.weekDay[myDate.getDay()];
    res += ', ';
    res += jsonString.substr(8, 2);
    res += ' ';
    res += this.monthMap.get(jsonString.substr(5, 2));
    res += ' ';
    res += jsonString.substr(0, 4);
    return res;
  }

  ngOnInit(): void {

    console.log('进入每日天气列表');

    this.weatherDataServiceService.eventEmit.subscribe(value => {
      this.weatherListData = this.weatherDataServiceService.weatherListData;
    });

    this.weatherListData = this.weatherDataServiceService.weatherListData;

    console.log('当前天气服务信息为:', this.weatherDataServiceService);

    console.log('当前每日每日天气信息为', this.weatherListData);
    // console.log(this.weatherListData);
  }

  getWeatherImg(weatherCode: string): string {
    return this.weatherCodeMap.get(weatherCode)[1][0];
  }

  getWeatherStatus(weatherCode: string): string {
    return (this.weatherCodeMap.get(weatherCode)[0] as string);
  }

}
