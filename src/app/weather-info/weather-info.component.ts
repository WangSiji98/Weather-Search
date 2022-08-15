import { Component, OnInit } from '@angular/core';
import {WeatherDataServiceService} from '../weather-data-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  added = false;
  imgSrc: string;
  latVisitIndex: string;

  city: string;
  state: string;

  constructor(private weatherDataServiceService: WeatherDataServiceService,
              private router: Router,) { }

  ngOnInit(): void {
    // this.imgSrc = '../../assets/img/uncolored.png';

    this.weatherDataServiceService.removeEventEmit.subscribe(value => {
      this.added = !this.added;
    });

    this.weatherDataServiceService.eventEmit.subscribe(value => {
      this.city = this.weatherDataServiceService.city;
      this.state = this.weatherDataServiceService.state;
    });

    this.city = this.weatherDataServiceService.city;
    this.state = this.weatherDataServiceService.state;
  }

  addorCancelFavorite(): void {
    this.added = !this.added;
    let favoriteIndex: number;
    const favoriteIndexString = localStorage.getItem('FavoriteIndex');
    if (favoriteIndexString == null) {
      favoriteIndex = 0;
    } else {
      favoriteIndex = Number(favoriteIndexString) + 1;
    }
    console.log(favoriteIndex);
    localStorage.setItem('FavoriteIndex', favoriteIndex.toString());

    const favoriteKey = 'Favorite' + favoriteIndex.toString();
    // tslint:disable-next-line:max-line-length
    const storageString = this.weatherDataServiceService.city + ',' + this.weatherDataServiceService.state + ',' + this.weatherDataServiceService.lat.toString() + ',' + this.weatherDataServiceService.lng.toString();
    if (this.added === true) {
      console.log('添加');
      localStorage.setItem(favoriteKey, storageString);
    } else {
      console.log('删除');
      localStorage.removeItem(favoriteKey);
    }

  }

  getLastVisitIndex(): any {
    this.latVisitIndex = localStorage.getItem('LastVisitIndex');
    if (this.latVisitIndex != null && this.latVisitIndex !== '-1') {
      return this.latVisitIndex;
    }
  }

  getButtonStatus(): boolean {
    this.latVisitIndex = localStorage.getItem('LastVisitIndex');
    if (this.latVisitIndex === null || this.latVisitIndex === '-1') {
        return true;
    } else {
      return false;
    }
  }

  gotoHourlyWeatherChart(): void {
    this.router.navigateByUrl('/result/weather-info/daily-weather-list');
    this.router.navigateByUrl('/result/weather-info/hourly-weather-chart');
  }

  gotodailyTemperatureChart(): void {
    this.router.navigateByUrl('/result/weather-info/daily-weather-list');
    this.router.navigateByUrl('/result/weather-info/daily-temperature-chart');
  }

  gotodailyWeatherList(): void {
    this.router.navigateByUrl('/result/weather-info/daily-weather-list');
  }
}
