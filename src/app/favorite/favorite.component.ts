import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WeatherDataServiceService} from '../weather-data-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favoriteList = [];
  showEmpty = true;

  showLocation: string;

  constructor(private http: HttpClient,
              private router: Router,
              private weatherDataServiceService: WeatherDataServiceService) { }

  showFavorite(index: number): void {
    const lat = this.favoriteList[index][2];
    const lng = this.favoriteList[index][3];
    console.log('新的经纬度:' + lng.toString() + ',' + lat.toString());
    console.log('请求了新的数据');
    this.weatherDataServiceService.city = this.favoriteList[index][0];
    this.weatherDataServiceService.state = this.favoriteList[index][1];
    this.showLocation = lat + ',' + lng;
    this.getWeatherListData();
  }

  getWeatherListData(): void {

    const tommorrowIoParams = {
      location: this.showLocation
    };

    this.http.get('https://cs571hw8-331704.wl.r.appspot.com/weather', {params: tommorrowIoParams}).subscribe(data1 => {
      if ((data1 as any).code !== undefined && (data1 as any).code === 429001) {
        this.router.navigateByUrl('/result/error');
        return;
      }
      this.weatherDataServiceService.weatherListData = (data1 as any).data.timelines[0].intervals;
      this.http.get('https://cs571hw8-331704.wl.r.appspot.com/daily_temperature', {params: tommorrowIoParams}).subscribe(data2 => {
        if ((data2 as any).code !== undefined && (data2 as any).code === 429001) {
          this.router.navigateByUrl('/result/error');
          return;
        }
        this.weatherDataServiceService.dailyTempData = data2;
        this.http.get('https://cs571hw8-331704.wl.r.appspot.com/hourly_weather', {params: tommorrowIoParams}).subscribe(data3 => {
          if ((data3 as any).code !== undefined && (data3 as any).code === 429001) {
            this.router.navigateByUrl('/result/error');
            return;
          }
          this.weatherDataServiceService.hourlyWeatherData = data3;
          this.weatherDataServiceService.eventEmit.emit('change');
          this.router.navigateByUrl('/result/weather-info/daily-weather-list');
        });
      });

    });

  }

  deleteIetm(index: number): void {
    let tmp = [];
    for (var i = 0; i < this.favoriteList.length; ++i) {
      if (i !== index) {
        tmp.push(this.favoriteList[i]);
      }
    }
    localStorage.removeItem(this.favoriteList[index][4]);
    this.favoriteList = tmp;
    if (this.favoriteList.length === 0) {
      this.showEmpty = true;
    }
    this.weatherDataServiceService.removeEventEmit.emit('remove');
  }


  ngOnInit(): void {
    this.favoriteList = [];
    const favoriteIndexString = localStorage.getItem('FavoriteIndex');

    if (favoriteIndexString === null) {
      this.showEmpty = true;
      return;
    } else {
      const maxIndex = Number(favoriteIndexString);
      for (let i = 0; i <= maxIndex; ++i) {
        const tmpKey = 'Favorite' + i.toString();
        const tmp = localStorage.getItem(tmpKey);
        if (tmp !== null) {
          const tmpFavoriteList = tmp.split(',');
          tmpFavoriteList.push(tmpKey);
          this.favoriteList.push(tmpFavoriteList);
        }
      }
      if (this.favoriteList.length === 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
    }

  }

}
