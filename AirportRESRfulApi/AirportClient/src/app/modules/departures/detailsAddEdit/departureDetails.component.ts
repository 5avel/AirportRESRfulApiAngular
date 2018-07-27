import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeparturesService } from '../../../services/departure.service';
import { Departure } from '../../../models/departure.model';

@Component({
  selector: 'app-departures-details',
  templateUrl: './departureDetails.component.html',
  styleUrls: ['./departureDetails.component.css'],
  providers: [DeparturesService]
})
export class DepartureDetailsComponent implements OnInit {

    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<Departure>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<Departure>;

   id: number;
   private sub: any;
   entity: Departure;
   editedDeparture: Departure;
   isNewRecord: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service:DeparturesService) {
     
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =  +params['id'];
    });
    if(this.id){
      this.load();
    }
    else
    {
      this.editedDeparture = new Departure(0, 0, "", "");
      this.isNewRecord = true;
    }
  }

  private load() {
    this.service.getById(this.id).subscribe((data: Departure) => {
      this.entity = data;
      this.entity.departureTime = this.entity.departureTime.slice(0, 16);
      
    });
  }

    // загружаем один из двух шаблонов
    loadTemplate() {
      if (this.editedDeparture) {
        return this.editTemplate;
      } else {
        return this.readOnlyTemplate;
      }
    }

      // редактирование
  edit() {
      this.editedDeparture = this.entity;
  }

    // сохраняем 
    save() {
      if (this.isNewRecord) {
        // добавляем 
        this.service.create(this.editedDeparture).subscribe(data => {
          this.isNewRecord = false;
          this.editedDeparture = null;
          this.router.navigate(['/departures']);
        });
      } else {
        // изменяем 
        this.service.update(this.editedDeparture.id, this.editedDeparture).subscribe(data => {
          this.load();
          this.editedDeparture = null;
        });
        
      }
    }

     // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.isNewRecord = false;
      this.router.navigate(['/departures']);
    }
    this.editedDeparture = null;
  }

    // удаление 
    delete() {
      this.service.delete(this.entity).subscribe(data => {
        this.router.navigate(['/departures']);
      });
    }

}
