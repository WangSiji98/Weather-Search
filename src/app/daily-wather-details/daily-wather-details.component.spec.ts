import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWatherDetailsComponent } from './daily-wather-details.component';

describe('DailyWatherDetailsComponent', () => {
  let component: DailyWatherDetailsComponent;
  let fixture: ComponentFixture<DailyWatherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWatherDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
