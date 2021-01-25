import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInputComponent } from './weather-input.component';

describe('WeatherInputComponent', () => {
  let component: WeatherInputComponent;
  let fixture: ComponentFixture<WeatherInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
