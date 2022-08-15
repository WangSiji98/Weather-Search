import {Data} from '@angular/router';

export interface Weather {
  // 展示在列表页的
  data: Date;
  weatherCode: string;
  tempHigh: number;
  tempLow: number;
  windSpeed: number;

  // 展示在详情页的
  tempApparent: number;
  sunRiseTime: Date;
  sunSetTime: Date;
  humidity: number;
  visibility: number;
  cloudCover: number;
  latitude: string;
  longitude: string;
}
