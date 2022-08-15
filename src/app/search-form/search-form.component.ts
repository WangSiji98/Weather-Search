import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Validators} from '@angular/forms';
import {WeatherDataServiceService} from '../weather-data-service.service';
import { debounceTime } from 'rxjs/operators';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, DoCheck {

  // 结果和收藏
  resultActivate = '';
  favoriteActivate = '';

  json: any;
  lng = ''; // 经度
  lat = ''; // 纬度
  lngAndLatStr = '';
  weatherListData: any;

  stateModel: any;

  autoCompleteOption: any;

  stateList = [['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
    ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District Of Columbia'], ['FL', ' Florida'],
    ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'],  ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
    ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],  ['MD', 'Maryland'],
    ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'],
    ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'],
    ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'],
    ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
    ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
    ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'],
    ['WY', 'Wyoming']];


  address = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl(''),
  });

  autoDetect = new FormControl('');

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private weatherDataServiceService: WeatherDataServiceService,
              ) {
    // this.weatherDataServiceService.activateEventer.subscribe(active => {
    //   console.log('我收到消息啦');
    //   this.resultActivate = 'activate';
    //   this.favoriteActivate = '';
    // });
  }

  ngOnInit(): void {
    this.resultActivate = 'active';
    this.favoriteActivate = '';
    this.address.get('city').valueChanges.pipe( debounceTime(300) ).subscribe(value => {

      if (value !== '') {
        const autoCompleteUrl = 'https://cs571hw8-331704.wl.r.appspot.com/auto_complete?input=' + value;

        this.http.get(autoCompleteUrl).subscribe(data => {
          this.autoCompleteOption = data;
          console.log(this.autoCompleteOption);
        });
      }
    });

  }
  ngDoCheck(): void {
    this.autoDetect.valueChanges.subscribe( value => {
      if (value === true) {
        this.address.disable();
      } else {
        this.address.enable();
      }
    });
  }

  clearContent(): void {
    this.router.navigateByUrl('/');
    this.address.enable();
    this.address.reset();
    this.autoDetect.reset();
  }

  // onReset(): void {
  //   this.router.navigateByUrl('/');
  //   this.address.enable();
  //   this.address.reset();
  //   this.resultActivate = 'activate';
  //   this.favoriteActivate = '';
  // }

  onSubmit(): void {

    localStorage.removeItem('LastVisitIndex');

    this.router.navigateByUrl('/result/progress');

    if (this.autoDetect.value === true) {
      console.log('自动检测');
      this.http.get('https://ipinfo.io/?token=d91eb0d80431de').subscribe(data => {
        this.lngAndLatStr = (data as any).loc;
        this.weatherDataServiceService.lat = (this.lngAndLatStr as string).split(',')[0];
        this.weatherDataServiceService.lng = (this.lngAndLatStr as string).split(',')[1];
        this.weatherDataServiceService.city = (data as any).city;
        this.weatherDataServiceService.state = (data as any).region;
        this.weatherDataServiceService.latAndLng = this.lngAndLatStr;
        this.getWeatherListData();
      });
    } else {
      console.log('请求谷歌地图api搜索');
      let addressStr = '';
      addressStr += this.address.value.street + '+' + this.address.value.city + '+' + this.address.value.state;

      const googleMapParams = {
        address : addressStr,
        key: 'AIzaSyD_ojwI96rsE2bDCU5tyH0eUDeSuCmPveM',
        language: 'en_US'
      };

      this.weatherDataServiceService.city = this.address.value.city;
      this.weatherDataServiceService.state = this.address.value.state;
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: googleMapParams}).subscribe(data => {
        this.lng = (data as any).results[0].geometry.location.lng;
        this.lat = (data as any).results[0].geometry.location.lat;
        this.lngAndLatStr = this.lat + ',' + this.lng;
        this.weatherDataServiceService.lat = this.lat;
        this.weatherDataServiceService.lng = this.lng;
        this.weatherDataServiceService.lng = (this.lngAndLatStr as string).split(',')[1];
        this.weatherDataServiceService.latAndLng = this.lngAndLatStr;

        console.log('经纬度信息为:', this.lngAndLatStr);

        this.getWeatherListData();
      });
    }


    // // console.log(typeof this.autoDetect.value);
  }

  getWeatherListData(): void {
    const tommorrowIoParams = {
      location: this.lngAndLatStr
    };

    this.http.get('https://cs571hw8-331704.wl.r.appspot.com/weather', {params: tommorrowIoParams}).subscribe(data1 => {
      if ((data1 as any).code !== undefined && (data1 as any).code === 429001) {
        this.router.navigateByUrl('/result/error');
        return;
      }
      console.log(data1);

      this.json = data1;
      this.weatherListData =  (data1 as any).data.timelines[0].intervals;
      this.weatherDataServiceService.weatherListData = this.weatherListData;

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
          this.router.navigateByUrl('/result/weather-info/daily-weather-list');

          console.log('当前天气服务信息为', this.weatherDataServiceService);
        });
      });

    });
  }



  clickAutocomplete(option: any): void {
    console.log(option);
    this.address.controls.state.setValue(option[1]);
  }


}
