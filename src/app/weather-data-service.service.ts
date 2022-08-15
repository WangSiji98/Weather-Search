import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataServiceService {

  weatherListData: any;
  dailyTempData: any;
  hourlyWeatherData: any;

  autoLocate = false;

  public eventEmit: any;
  public removeEventEmit: any;

  lng: string;
  lat: string;

  latAndLng: string;

  street: string;
  city: string;
  state: string;

  constructor() {
    this.eventEmit = new EventEmitter();
    this.removeEventEmit = new EventEmitter();
  }
}
