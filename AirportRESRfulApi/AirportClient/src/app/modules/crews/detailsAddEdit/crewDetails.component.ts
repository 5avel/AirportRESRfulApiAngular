import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrewsService } from '../../../services/crews.service';
import { Crew } from '../../../models/crew.model';

@Component({
  selector: 'app-crew-details',
  templateUrl: './crewDetails.component.html',
  styleUrls: ['./crewDetails.component.css'],
  providers: [CrewsService]
})
export class CrewDetailsComponent implements OnInit {

    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<Crew>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<Crew>;

   id: number;
   private sub: any;
   entity: Crew;
   editedCrew: Crew;
   isNewRecord: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service:CrewsService) {
     
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
      this.editedCrew= new Crew(0, 0, '');
      this.isNewRecord = true;
    }
  }

  private load() {
    this.service.getById(this.id).subscribe((data: Crew) => {
      this.entity = data;
      
    });
  }

    // загружаем один из двух шаблонов
    loadTemplate() {
      if (this.editedCrew) {
        return this.editTemplate;
      } else {
        return this.readOnlyTemplate;
      }
    }

      // редактирование
  edit() {
      this.editedCrew = this.entity;
  }

    // сохраняем 
    save() {
      if (this.isNewRecord) {
        // добавляем 
        this.service.create(this.editedCrew).subscribe(data => {
          this.isNewRecord = false;
          this.editedCrew = null;
          this.router.navigate(['/crews']);
        });
      } else {
        // изменяем 
        this.service.update(this.editedCrew.id, this.editedCrew).subscribe(data => {
          this.load();
          this.editedCrew = null;
        });
        
      }
    }

     // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.isNewRecord = false;
      this.router.navigate(['/crews']);
    }
    this.editedCrew = null;
  }

    // удаление 
    delete() {
      this.service.delete(this.entity).subscribe(data => {
        this.router.navigate(['/crews']);
      });
    }

}
