import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWeatherChartComponent } from './hourly-weather-chart.component';

describe('HourlyWeatherChartComponent', () => {
  let component: HourlyWeatherChartComponent;
  let fixture: ComponentFixture<HourlyWeatherChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWeatherChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyWeatherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
