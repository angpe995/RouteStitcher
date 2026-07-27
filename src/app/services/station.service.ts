import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/station';
@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get<Station[]>('http://localhost:5000/api/stations');
  }
}