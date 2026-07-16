import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionCard } from './connection-card';

describe('ConnectionCard', () => {
  let component: ConnectionCard;
  let fixture: ComponentFixture<ConnectionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
