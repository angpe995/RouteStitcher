import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Station, MOCK_STATIONS } from './mock-stations';
import { SearchPage } from '../search-page/search-page';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-ticket-search',
  imports: [FormsModule,SearchPage],
  templateUrl: './ticket-search.html',
  styleUrl: './ticket-search.scss',
})
export class TicketSearch {
showResults = false;
fromStation = "";
toStation = "";
travelDate = "";
stationsList: Station[] =[];
constructor(private stationService: StationService) {}

onSubmit() {
  this.showResults = true;
}
filteredStations: Station[] = [];

  search(query: string) {
    const normalized = query.trim().toLowerCase();
        if (normalized.length < 3) {
        this.filteredStations = [];
        return;
    }
    this.filteredStations = this.stationsList.filter(station =>
      station.name.toLowerCase().includes(query.toLowerCase())
    );
    
  }
ngOnInit() {
    this.stationService.getStations().subscribe(stations => {
      this.stationsList = stations;
      this.filteredStations = stations;

    });
    
  }

}
