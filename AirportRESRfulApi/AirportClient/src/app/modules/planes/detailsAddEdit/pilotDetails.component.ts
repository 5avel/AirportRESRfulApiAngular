import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PilotsService } from '../../../services/pilots.service';
import { Pilot } from '../../../models/pilot.model';

@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilotDetails.component.html',
  styleUrls: ['./pilotDetails.component.css'],
  providers: [PilotsService]
})
export class PilotDetailsComponent implements OnInit {

    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<Pilot>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<Pilot>;

   id: number;
   private sub: any;
   entity: Pilot;
   editedPilot: Pilot;
   isNewRecord: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service:PilotsService) {
     
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
      this.editedPilot= new Pilot(0, 0, '','','',0);
      this.isNewRecord = true;
    }
  }

  private load() {
    this.service.getById(this.id).subscribe((data: Pilot) => {
      this.entity = data;
      this.entity.birthday = this.entity.birthday.slice(0, 16);
      
    });
  }

    // загружаем один из двух шаблонов
    loadTemplate() {
      if (this.editedPilot) {
        return this.editTemplate;
      } else {
        return this.readOnlyTemplate;
      }
    }

      // редактирование
  edit() {
      this.editedPilot = this.entity;
  }

    // сохраняем 
    save() {
      if (this.isNewRecord) {
        // добавляем 
        this.service.create(this.editedPilot).subscribe(data => {
          this.isNewRecord = false;
          this.editedPilot = null;
          this.router.navigate(['/pilots']);
        });
      } else {
        // изменяем 
        this.service.update(this.editedPilot.id, this.editedPilot).subscribe(data => {
          this.load();
          this.editedPilot = null;
        });
        
      }
    }

     // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.isNewRecord = false;
      this.router.navigate(['/pilots']);
    }
    this.editedPilot = null;
  }

    // удаление 
    delete() {
      this.service.delete(this.entity).subscribe(data => {
        this.router.navigate(['/pilots']);
      });
    }

}
