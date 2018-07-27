import { Component, OnInit } from '@angular/core';
import { DeparturesService } from '../../services/departure.service';
import { Departure } from '../../models/departure.model';
@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css'],
  providers: [DeparturesService]
})
export class DeparturesComponent implements OnInit {

  departures: Array<Departure>;
  editedDeparture: Departure;
  isNewRecord: boolean;

  constructor(private service:DeparturesService) {
      this.departures = new Array<Departure>();
   }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: Departure[]) => {
      this.departures = data.map(x => {
        x.departureTime = x.departureTime.slice(0, 16);
        return x;
      });
    });
  }

  add() {
    this.editedDeparture = new Departure(0, 0, "", "");
    this.departures.push(this.editedDeparture);
    this.isNewRecord = true;
  }

}
