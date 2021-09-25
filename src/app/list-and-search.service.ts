import {Injectable} from '@angular/core';
import {createServer} from 'miragejs';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

/**
 * Flight Interface
 */
export interface Flight {
  origin: string;
  destination: string;
  date: Date;
  price: number;
  length: number;
}

/**
 * Flights Data to show (Mocking Server)
 */
createServer({
  routes() {
    this.namespace = "api";

    this.get("/flights", () => {
        return [
          {
            origin: 'Holand',
            destination: 'Belgia',
            date: new Date('07 07 2021'),
            price: 120,
            length: 200
          },
          {
            origin: 'Poland',
            destination: 'USA',
            date: new Date('09 21 2021'),
            price: 300,
            length: 80
          },
          {
            origin: 'USA',
            destination: 'Holand',
            date: new Date('03 12 2021'),
            price: 210,
            length: 100
          },
          {
            origin: 'Israel',
            destination: 'Germany',
            date: new Date('07 23 2021'),
            price: 300,
            length: 20
          },
          {
            origin: 'Holand',
            destination: 'Israel',
            date: new Date('05 19 2021'),
            price: 250,
            length: 230
          },
          {
            origin: 'Israel',
            destination: 'Poland',
            date: new Date('01 12 2022'),
            price: 380,
            length: 40
          },
          {
            origin: 'Russia',
            destination: 'Israel',
            date: new Date('08 27 2021'),
            price: 400,
            length: 130
          },
        ]
      },
      {
        timing: 1000
      }
    )
  }
})

@Injectable({
  providedIn: 'root'
})
export class ListAndSearchService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get List of Flights
   */
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/flights');
  }


}


