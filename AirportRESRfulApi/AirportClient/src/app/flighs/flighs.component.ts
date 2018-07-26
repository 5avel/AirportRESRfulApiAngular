import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { Flight } from '../models/flight';
import { FlightsService } from '../services/flighs.service';
import { Observable } from 'rxjs';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-flighs',
  templateUrl: './flighs.component.html',
  styleUrls: ['./flighs.component.css'],
  providers: [FlightsService]
})
export class FlighsComponent implements OnInit {

  //типы шаблонов
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedFlight: Flight;
  flights: Array<Flight>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: FlightsService) {
    this.flights = new Array<Flight>();
  }

  ngOnInit() {
    this.loadFlights();
  }

  private loadFlights() {
    this.service.getFlights().subscribe((data: Flight[]) => {
      this.flights = data.map(x => {
        x.departureTime = x.departureTime.slice(0, 16);
        x.arrivalTime = x.arrivalTime.slice(0, 16);
        return x;
      });
    });
  }

 

  addFlight() {
    this.editedFlight = new Flight(0, "", "", "", "", "");
    this.flights.push(this.editedFlight);
    this.isNewRecord = true;
  }

  // редактирование
  editFlight(flight: Flight) {
    this.editedFlight = new Flight(flight.id, flight.flightNumber, flight.departurePoint, flight.departureTime, flight.destinationPoint, flight.arrivalTime);
  }
  // загружаем один из двух шаблонов
  loadTemplate(flight: Flight) {
    if (this.editedFlight && this.editedFlight.id == flight.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем 
  saveFlight() {
    if (this.isNewRecord) {
      // добавляем 
      this.service.createFlight(this.editedFlight).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadFlights();
      });
      this.isNewRecord = false;
      this.editedFlight = null;
    } else {
      // изменяем 
      this.service.updateFlight(this.editedFlight.id, this.editedFlight).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadFlights();
      });
      this.editedFlight = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.flights.pop();
      this.isNewRecord = false;
    }
    this.editedFlight = null;
  }
  // удаление пользователя
  deleteFlight(flight: Flight) {
    this.service.deleteFlight(flight).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadFlights();
    });
  }

}
