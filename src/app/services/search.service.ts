import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/station';
import { calculateDuration, ConnectionResponse } from '../components/connection-card/connection.model';
import { environment } from '../../environments/environment';

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
    return this.http.get<ConnectionResponse[]>(`${environment.apiUrl}/search`, {
      params: {
        departure: departure.id,
        destination: destination.id,
        date
      }
    });
  }
}