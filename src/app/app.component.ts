import { Component } from '@angular/core';
import { ListAndSearchService, Flight } from './list-and-search.service';

interface Col {
  field: string;
  header: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  flights: Flight[]; // list of flights
  cols: Col[];

  constructor(private listAndSearch: ListAndSearchService) {
    this.flights = listAndSearch.getFlights(); // get flight list

    this.cols = [
      {
        header: 'Origin',
        field: 'origin'
      },
      {
        header: 'Destination',
        field: 'destination'
      },
      {
        header: 'Date',
        field: 'date'
      },
      {
        header: 'Price',
        field: 'price'
      },
      {
        header: 'Length',
        field: 'length'
      },
    ];

  }

  public bookMe = (flightDate: Flight): void => {
    window.alert("Flight from : " + flightDate.origin + " to : " + flightDate.destination + " was Booked for you !");
  }




}
