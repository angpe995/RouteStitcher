import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketSearch } from './components/ticket-search/ticket-search';
import {SearchPage} from './components/search-page/search-page';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('RouteStitcher');
}
