import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private http = inject(HttpClient);

  private stationsMap = new Map<number, string>();

  private stations$ = this.http
    .get<Station[]>('http://localhost:5000/api/stations')
    .pipe(
      tap(stations => {
        stations.forEach(station => {
          this.stationsMap.set(Number(station.id), station.name);
        });
      }),
      shareReplay(1)
    );

  getStations() {
    return this.stations$;
  }

  getStationName(stationId: number): string {
    return this.stationsMap.get(stationId) ?? 'Unknown';
  }
}