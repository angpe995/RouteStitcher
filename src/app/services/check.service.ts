import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Brand, ConnectionDetail ,ApiCheckedConnection} from '../components/connection-card/connection.model';
import { Observable, map, shareReplay } from 'rxjs';
import { tap } from 'rxjs';
import { ConnectionCard } from '../components/connection-card/connection-card';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Check {
  private http = inject(HttpClient);
  checkConnection(connection: ConnectionDetail, NumberOfTickets: number, placeClass: number | null = null): Observable<ApiCheckedConnection[]> {
    const url = `${environment.apiUrl}/${connection.id}/check`;
    console.log(url);
    return this.http.post<ApiCheckedConnection[]>(url, {
      tickets: NumberOfTickets,
      placeClass: placeClass,
    });
  }
}
