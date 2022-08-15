import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherDataServiceService} from '../weather-data-service.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-daily-wather-details',
  templateUrl: './daily-wather-details.component.html',
  styleUrls: ['./daily-wather-details.component.css']
})
export class DailyWatherDetailsComponent implements OnInit {

  lat: number;
  lng: number;

  // 天气代码与天气名称以及天气图片URL的转换
  weatherCodeMap = new Map([
    ['4201', 'Heavy Rain'],
    ['4001', 'Rain'],
    ['4200', 'Light Rain'],
    ['6201', 'Heavy Freezing Rain'],
    ['6001', 'Freezing Rain'],
    ['6200', 'Light Freezing Rain'],
    ['6000', 'Freezing Drizzle'],
    ['4000', 'Drizzle'],
    ['7101', 'Heavy Ice Pellets'],
    ['7000', 'Ice Pellets'],
    ['7102', 'Light Ice Pellets'],
    ['5101', 'Heavy Snow'],
    ['5000', 'Snow'],
    ['5100', 'Light Snow'],
    ['5001', 'Flurries'],
    ['8000', 'Thunderstorm'],
    ['2100', 'Light Fog'],
    ['2000', 'Fog'],
    ['1001', 'Cloudy'],
    ['1102', 'Mostly Cloudy'],
    ['1101', 'Partly Cloudy'],
    ['1100', 'Mostly Clear'],
    ['1000', 'Clear Sunny'],
    ['3000', 'Light Wind'],
    ['3001', 'Wind'],
    ['3002', 'Strong Wind'],
  ]);

  weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  index: number;
  dailyWeatherData: any;

  twitterText = '';
  twitterHashtags = '';

  constructor(
    private route: ActivatedRoute,
    private weatherDataServiceService: WeatherDataServiceService
  ) {
  }

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

  returnList(outlet: RouterOutlet): void {
    console.log(outlet?.activatedRouteData?.animation);

  }

  ngOnInit(): void {
    // this.weatherDataServiceService.activateEventer.emit(true);

    this.route.params.subscribe((params) => {
      this.index = Number((params as any).index);
      this.dailyWeatherData = this.weatherDataServiceService.weatherListData[this.index] as any;
      localStorage.setItem('LastVisitIndex', this.index.toString());
    });
    this.lat = Number(this.weatherDataServiceService.lat);
    this.lng = Number(this.weatherDataServiceService.lng);

    console.log('当前的纬度是:', this.lat);
    console.log('当前的经度是:', this.lng);

    // tslint:disable-next-line:max-line-length
    this.twitterText = 'The temperature in ' + this.weatherDataServiceService.city.toString() + ' ' + this.weatherDataServiceService.state.toString() + ' on ' + this.getDate(this.dailyWeatherData.startTime.toString()) + ' is ' + this.dailyWeatherData.values.temperature.toString() + '℉. The weather conditions are ' + this.getWeatherStatus(this.dailyWeatherData.values.weatherCode.toString()) + ' ';
    this.twitterHashtags = 'CSCI571WeatherSearch';
  }

  getWeatherStatus(weatherCode: string): string {
    return this.weatherCodeMap.get(weatherCode);
  }

}
