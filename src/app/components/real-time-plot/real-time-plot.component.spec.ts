import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimePlotComponent } from './real-time-plot.component';

describe('RealTimePlotComponent', () => {
  let component: RealTimePlotComponent;
  let fixture: ComponentFixture<RealTimePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimePlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
