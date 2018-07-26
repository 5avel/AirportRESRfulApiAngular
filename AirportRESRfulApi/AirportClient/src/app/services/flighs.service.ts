import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private url = "http://localhost:5000/api/flights";

  constructor(private http: HttpClient) { }

  getFlights() {
    let flights = this.http.get(this.url);
    return flights;
  }

  createFlight(flight: Flight) {
    return this.http.post(this.url, flight);
  }

  updateFlight(id: number, flight: Flight) {
    return this.http.put(this.url + '/'+ id.toString(), flight);
  }

  deleteFlight(flight: Flight) {
    return this.http.delete(this.url + '/' + flight.id.toString());
  }
}
