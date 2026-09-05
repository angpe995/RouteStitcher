import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Station } from './mock-stations';
import { SearchPage } from '../search-page/search-page';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-ticket-search',
  imports: [FormsModule, SearchPage],
  templateUrl: './ticket-search.html',
  styleUrl: './ticket-search.scss',
})
export class TicketSearch {
  searchId = 0;
  showResults = false;
  fromStation = '';
  toStation = '';
  travelDate = '';
  stationsList: Station[] = [];
  constructor(private stationService: StationService) {}
  searchParams: {
    departure: Station;
    destination: Station;
    date: string;
  } | null = null;
  onSubmit() {
    const departure = this.stationsList.find(
      (station) => station.name.trim().toLowerCase() === this.fromStation.trim().toLowerCase(),
    );

    const destination = this.stationsList.find(
      (station) => station.name.trim().toLowerCase() === this.toStation.trim().toLowerCase(),
    );

    if (!departure || !destination || !this.travelDate) {
      return;
    }
    this.searchId++;
    this.searchParams = {
      departure,
      destination,
      date: this.travelDate,
    };
  }
  filteredStations: Station[] = [];

  search(query: string) {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 3) {
      this.filteredStations = [];
      return;
    }
    this.filteredStations = this.stationsList.filter((station) =>
      station.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
  ngOnInit() {
    this.stationService.getStations().subscribe((stations) => {
      this.stationsList = stations;
      this.filteredStations = stations;
    });
  }
}
