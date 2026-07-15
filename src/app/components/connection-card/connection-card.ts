import { Component, Input } from '@angular/core';
import { JourneyTimeline } from '../journey-timeline/journey-timeline';
import { ConnectionDetail } from './connection.model';
@Component({
  selector: 'app-connection-card',
  imports: [JourneyTimeline],
  templateUrl: './connection-card.html',
  styleUrl: './connection-card.scss',
})
export class ConnectionCard {
   @Input({ required: true }) connection!: ConnectionDetail;
   buyTicket() {
      console.log('Buying ticket for connection:', this.connection);
   }
   getBrandColor(brand: string): string {
    switch (brand) {
      case 'IC':
        return '#FFB158';
      case 'PR':
        return '#BB4430';
      case 'TLK':
        return '#ffb938';
      default:
        return '#34357C';
    }
  } 
}
