import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherListComponent } from './daily-weather-list.component';

describe('DailyWeatherListComponent', () => {
  let component: DailyWeatherListComponent;
  let fixture: ComponentFixture<DailyWeatherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWeatherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWeatherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
