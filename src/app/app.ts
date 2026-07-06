import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketSearch } from './components/ticket-search/ticket-search';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('RouteStitcher');
}
