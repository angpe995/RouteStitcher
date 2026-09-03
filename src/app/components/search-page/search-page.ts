import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import {
  ConnectionDetail,
  ConnectionResponse,
  ApiLeg,
  JourneySegment,
} from '../connection-card/connection.model';
import { Station } from '../../models/station';
import { SearchService } from '../../services/search.service';
import { ConnectionCard } from '../connection-card/connection-card';
import { StationService } from '../../services/station.service';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-search-page',
  imports: [ConnectionCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage implements OnChanges {
  @Input() searchParams: {
    departure: Station;
    destination: Station;
    date: string;
  } | null = null;
  updateConnection(updatedConnection: ConnectionDetail) {
    this.connections = this.connections.map((connection) =>
      connection.id === updatedConnection.id ? updatedConnection : connection,
    );
  }
  checkingConnectionId: string | null = null;
  connections: ConnectionDetail[] = [];
  checkingConnection(id: string | null) {
    this.checkingConnectionId = id;
  }
  constructor(
    private stationService: StationService,
    private searchService: SearchService,
    private brandService: BrandService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.brandService.getBrands().subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.searchParams) {
      this.loadConnections();
    }
  }

  private loadConnections() {
    const params = this.searchParams;
    if (!params) return;
    forkJoin([this.stationService.getStations(), this.brandService.getBrands()])
      .pipe(
        switchMap(() =>
          this.searchService.search(params.departure, params.destination, params.date),
        ),
      )
      .subscribe({
        next: (connectionsData) => {
          this.connections = connectionsData.map((connection) => this.mapConnection(connection));
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err),
      });
  }

  private formatTime(date: string): string {
    return new Date(date).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private mapConnection(connection: ConnectionResponse): ConnectionDetail {
    const trainLegs = connection.legs.filter((leg) => leg.leg_type === 'train_leg');
    const segments = trainLegs.map((leg) => this.mapJourneySegment(leg,connection.uuid));
    return {
      id: connection.uuid,
      startTime: this.formatTime(connection.departure),
      endTime: this.formatTime(connection.arrival),
      duration: `${connection.duration} min`,
      segments: segments,
    };
  }
  private createTicketUrl( uuid: string): string {
    return `https://koleo.pl/connection/${uuid}`;
  }
  private mapJourneySegment(leg: ApiLeg,uuid:string): JourneySegment {
    return {
      fromStation: this.stationService.getStationName(leg.origin_station_id),
      toStation: this.stationService.getStationName(leg.destination_station_id),
      trainBrand: this.brandService.getBrand(leg.commercial_brand_id),
      trainId: String(leg.train_id),
      hasSeat: false,
      uuid:uuid
    };
  }
}
