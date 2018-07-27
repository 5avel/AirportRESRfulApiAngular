import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StewardessesService } from '../../../services/stewardess.service';
import { Stewardess } from '../../../models/stewardess.model';

@Component({
  selector: 'app-stewardessDetails-details',
  templateUrl: './stewardessDetails.component.html',
  styleUrls: ['./stewardessDetails.component.css'],
  providers: [StewardessesService]
})
export class StewardessDetailsComponent implements OnInit {

    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<Stewardess>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<Stewardess>;

   id: number;
   private sub: any;
   entity: Stewardess;
   editedPilot: Stewardess;
   isNewRecord: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service:StewardessesService) {
     
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
      this.editedPilot= new Stewardess(0, 0, '','','');
      this.isNewRecord = true;
    }
  }

  private load() {
    this.service.getById(this.id).subscribe((data: Stewardess) => {
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
          this.router.navigate(['/stewardesses']);
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
      this.router.navigate(['/stewardesses']);
    }
    this.editedPilot = null;
  }

    // удаление 
    delete() {
      this.service.delete(this.entity).subscribe(data => {
        this.router.navigate(['/stewardesses']);
      });
    }

}
