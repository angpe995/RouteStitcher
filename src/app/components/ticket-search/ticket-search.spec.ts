import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSearch } from './ticket-search';

describe('TicketSearch', () => {
  let component: TicketSearch;
  let fixture: ComponentFixture<TicketSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
