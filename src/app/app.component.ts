import { Component } from '@angular/core';
import { ListAndSearchService, Flight } from './list-and-search.service';

interface Origin {
  name: string;
}

interface Destination {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  flights: Flight[] = []; // list of flights

  origins: Origin[] = [];
  selectedOrigin: Origin = { name: '' };

  destinations: Destination[] = [];
  selectedDestination: Destination = { name: '' };

  loading: boolean = false;

  constructor(private listAndSearch: ListAndSearchService) {
    this.loading = true;

    this.listAndSearch.getFlights().subscribe((flights) => {
      this.flights = flights;

      /**
       * Initialize connection selects - Origin & Destination
       */
      this.flights.map((flight) => {
        this.origins.push({ name: flight.origin });
        this.destinations.push({ name: flight.destination });
      })
      this.loading = false;
    });

  }

  /**
   * Reset list of flights.
   */
  public resetListOfFlights = () => {
    this.loading = true;

    this.listAndSearch.getFlights().subscribe((flights) => {
      this.flights = flights;
      this.loading = false;
    });
  }

  /**
   * Show message of booking with Origin & Destination
   * @param flightDate Flight Object
   */
  public bookMe = (flightDate: Flight): void => {
    window.alert("Flight from : " + flightDate.origin + " to : " + flightDate.destination + " was Booked for you !");
  }

  /**
   * Show connections between 2 lines.
   */
  public showConnection = () => {
    if(this.selectedOrigin.name === '' || this.selectedDestination.name === ''){
      window.alert('Please select Origin and Destination to show.')
    }
    else{
      let tempFlights: Flight[] = [];
      for(let x=0; x<this.flights.length; x++){
        for(let y=0; y<this.flights.length; y++){
          if(this.flights[x].origin.localeCompare(this.selectedOrigin.name) === 0 &&
            this.flights[y].destination.localeCompare(this.selectedDestination.name) === 0 &&
            this.flights[x].destination.localeCompare(this.flights[y].origin) === 0
          ){
            tempFlights.push(this.flights[x]);
            tempFlights.push(this.flights[y]);
          }
        }
      }
      this.flights = tempFlights;
    }
  }

}
