import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JourneyTimeline } from '../journey-timeline/journey-timeline';
import { ConnectionDetail, ApiCheckedConnection, JourneySegment } from './connection.model';
import { Brand } from '../connection-card/connection.model';
import { Check } from '../../services/check.service';
import { SearchService } from '../../services/search.service';
import { StationService } from '../../services/station.service';
import { BrandService } from '../../services/brand.service';

import { finalize } from 'rxjs';
@Component({
  selector: 'app-connection-card',
  imports: [JourneyTimeline],
  templateUrl: './connection-card.html',
  styleUrl: './connection-card.scss',
})
export class ConnectionCard {
  private formatTime(date: string): string {
    return new Date(date).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  @Input({ required: true }) connection!: ConnectionDetail;
  @Input() active!: boolean;
  @Output() connectionUpdated = new EventEmitter<ConnectionDetail>();
  @Output() loadingProperty = new EventEmitter<string | null>();
  constructor(
    private check: Check,
    private stationService: StationService,
    private searchService: SearchService,
    private brandService: BrandService,
  ) {}
  loading: boolean = false;
  private mapCheckedConnection(connection: ApiCheckedConnection): JourneySegment[] {
    console.log(connection);
    let fromStation;
    let toStation;
    let segments: JourneySegment[]=[];
  
    if (connection.routeVariant.segments.length == 0) {
        console.log(connection);
      segments.push({
         fromStation: this.stationService.getStationName(connection.origin_station_id),
        toStation: this.stationService.getStationName(connection.destination_station_id),
         trainBrand: this.brandService.getBrand(connection.routeVariant.brand_id),
        trainId: String(connection.train_nr),
        hasSeat: connection.routeVariant.coverage?true:false
      });
     
    } else {
      segments= connection.routeVariant.segments.map((segment) => ({
        fromStation: this.stationService.getStationName(segment.station_origin),
        toStation: this.stationService.getStationName(segment.station_destination),
        trainBrand: this.brandService.getBrand(segment.brand_id),
        trainId: String(segment.train_nr),
        hasSeat: segment.available,
      }));
    }

    console.log(segments);
    return segments;
  }
  buyTicket() {
    this.loading = true;
    this.loadingProperty.emit(this.connection.id);
    this.check
      .checkConnection(this.connection)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loadingProperty.emit(null);
        }),
      )
      .subscribe((result) => {
        const segments: JourneySegment[] = result.flatMap((item) =>
          this.mapCheckedConnection(item),
        );
        this.connection = {
          ...this.connection,
          segments,
        };
        this.connectionUpdated.emit(this.connection);
      });
  }
  getBrandColor(brand: Brand): string {
    return brand.color;
  }
}
