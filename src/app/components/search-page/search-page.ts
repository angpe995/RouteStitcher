import { Component } from '@angular/core';
import { calculateDuration, ConnectionDetail, MOCK_CONNECTIONS } from '../connection-card/connection.model';
import { ConnectionCard } from '../connection-card/connection-card';
@Component({
  selector: 'app-search-page',
  imports: [ConnectionCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  connections: ConnectionDetail[] = [];
  ngOnInit() {
    this.connections = MOCK_CONNECTIONS.map(conn => ({
      ...conn,
      duration: calculateDuration(conn.startTime, conn.endTime)
    }));
  }
}