import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class ConnectionCard implements OnChanges {
  private formatTime(date: string): string {
    return new Date(date).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  @Input({ required: true }) connection!: ConnectionDetail;
  @Input() active!: boolean;
  @Output() loadingProperty = new EventEmitter<string | null>();
  @Output() ticketChecked = new EventEmitter<void>();
  constructor(
    private check: Check,
    private stationService: StationService,
    private searchService: SearchService,
    private brandService: BrandService,
  ) {}
  checkedSegments: JourneySegment[] = [];
  loading: boolean = false;
  is_checked: boolean = false;
  ticketCount = 2;
  showTicketOptions = false;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['connection']) {
      this.is_checked = false;
      this.loading = false;
      this.checkedSegments = [];
      this.showTicketOptions = false;
    }
  }
  selectTicketCount(count: number) {
    if (this.ticketCount === count) {
      this.showTicketOptions = false;
      return;
    }
    this.ticketCount = count;
    this.showTicketOptions = false;
    this.is_checked = false;
    this.checkedSegments = [];
  }
  private mapCheckedConnection(connection: ApiCheckedConnection): JourneySegment[] {
    console.log(connection);
    let fromStation;
    let toStation;
    let segments: JourneySegment[] = [];
    if (connection.routeVariant.segments.length == 0) {
      console.log(connection);
      segments.push({
        fromStation: this.stationService.getStationName(connection.origin_station_id),
        toStation: this.stationService.getStationName(connection.destination_station_id),
        trainBrand: this.brandService.getBrand(connection.routeVariant.brand_id),
        trainId: String(connection.train_nr),
        hasSeat: connection.routeVariant.coverage ? true : false,
        uuid: connection.uuid,
      });
    } else {
      segments = connection.routeVariant.segments.map((segment) => ({
        fromStation: this.stationService.getStationName(segment.origin_station_id),
        toStation: this.stationService.getStationName(segment.destination_station_id),
        trainBrand: this.brandService.getBrand(segment.brand_id),
        trainId: String(segment.train_nr),
        hasSeat: segment.available,
        uuid: segment.uuid,
      }));
    }

    console.log(segments);
    return segments;
  }
  checkTicket() {
    this.loading = true;
    this.loadingProperty.emit(this.connection.id);
    this.check
      .checkConnection(this.connection, this.ticketCount, 5)
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

        console.log('SEGMENTS', segments);

        this.checkedSegments = segments;
        this.is_checked = true;
        this.ticketChecked.emit();
      });
  }
  createTicketUrl(uuid: string): string {
    return 'https://koleo.pl/connection/' + uuid;
  }
  buyTicket() {
    const urls = [];
    let previous: JourneySegment | null = null;
    for (const segment of this.checkedSegments) {
      if (previous && previous.uuid !== segment.uuid) {
        urls.push(this.createTicketUrl(segment.uuid));
      } else if (!previous) {
        urls.push(this.createTicketUrl(segment.uuid));
      }
      previous = segment;
    }
    if (this.checkedSegments.length === 0) {
      window.open(this.createTicketUrl(this.connection.id), '_blank');
      return;
    }
    urls.forEach((url) => {
      window.open(url, '_blank');
    });
    return urls;
  }
  getBrandColor(brand: Brand): string {
    return brand.color;
  }
}
