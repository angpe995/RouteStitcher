import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Brand, ConnectionDetail ,ApiCheckedConnection} from '../components/connection-card/connection.model';
import { Observable, map, shareReplay } from 'rxjs';
import { tap } from 'rxjs';
import { ConnectionCard } from '../components/connection-card/connection-card';

@Injectable({
  providedIn: 'root',
})
export class Check {
  private http = inject(HttpClient);
  checkConnection(connection: ConnectionDetail) {
    const url = `http://localhost:5000/api/${connection.id}/check`;
    console.log(url);
    return this.http.post<ApiCheckedConnection[]>(url, {
      tickets: 2,
      placeClass:5,
    });
  }
}
