import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTemperatureChartComponent } from './daily-temperature-chart.component';

describe('DailyTemperatureChartComponent', () => {
  let component: DailyTemperatureChartComponent;
  let fixture: ComponentFixture<DailyTemperatureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTemperatureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTemperatureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
