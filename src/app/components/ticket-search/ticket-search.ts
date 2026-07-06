import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Station, MOCK_STATIONS } from './mock-stations';
@Component({
  selector: 'app-ticket-search',
  imports: [FormsModule],
  templateUrl: './ticket-search.html',
  styleUrl: './ticket-search.scss',
})
export class TicketSearch {
searchTerm: string = '';
onSubmit() {
throw new Error('Method not implemented.');
}
stationsList: Station[] = MOCK_STATIONS;
}
