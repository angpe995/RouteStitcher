import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Station, MOCK_STATIONS } from './mock-stations';
import { SearchPage } from '../search-page/search-page';
@Component({
  selector: 'app-ticket-search',
  imports: [FormsModule,SearchPage],
  templateUrl: './ticket-search.html',
  styleUrl: './ticket-search.scss',
})
export class TicketSearch {
showResults = false;
searchTerm: string = '';
onSubmit() {
  this.showResults = true;
}
stationsList: Station[] = MOCK_STATIONS;
}
