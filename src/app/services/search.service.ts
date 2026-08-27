import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/station';
import { calculateDuration, ConnectionResponse } from '../components/connection-card/connection.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}
  search(
    departure: Station,
    destination: Station,
    date: string
  ) {
    return this.http.get<ConnectionResponse[]>('http://localhost:5000/api/search', {
      params: {
        departure: departure.id,
        destination: destination.id,
        date
      }
    });
  }
}