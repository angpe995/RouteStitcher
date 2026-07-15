import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgClass } from '@angular/common';
import { JourneyTimeline } from './journey-timeline';

describe('JourneyTimeline', () => {
  let component: JourneyTimeline;
  let fixture: ComponentFixture<JourneyTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyTimeline, NgClass],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
