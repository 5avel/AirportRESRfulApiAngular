import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaneTypesService } from '../../../services/planeTypes.service';
import { PlaneType } from '../../../models/planeType.model';

@Component({
  selector: 'app-planeType-details',
  templateUrl: './planeTypeDetails.component.html',
  styleUrls: ['./planeTypeDetails.component.css'],
  providers: [PlaneTypesService]
})
export class PlaneTypeDetailsComponent implements OnInit {

    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<PlaneType>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<PlaneType>;

   id: number;
   private sub: any;
   entity: PlaneType;
   editedPlaneType: PlaneType;
   isNewRecord: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service:PlaneTypesService) {
     
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
      this.editedPlaneType= new PlaneType(0, '',0,0,0,0);
      this.isNewRecord = true;
    }
  }

  private load() {
    this.service.getById(this.id).subscribe((data: PlaneType) => {
      this.entity = data;
      
    });
  }

    // загружаем один из двух шаблонов
    loadTemplate() {
      if (this.editedPlaneType) {
        return this.editTemplate;
      } else {
        return this.readOnlyTemplate;
      }
    }

      // редактирование
  edit() {
      this.editedPlaneType = this.entity;
  }

    // сохраняем 
    save() {
      if (this.isNewRecord) {
        // добавляем 
        this.service.create(this.editedPlaneType).subscribe(data => {
          this.isNewRecord = false;
          this.editedPlaneType = null;
          this.router.navigate(['/planeTypes']);
        });
      } else {
        // изменяем 
        this.service.update(this.editedPlaneType.id, this.editedPlaneType).subscribe(data => {
          this.load();
          this.editedPlaneType = null;
        });
        
      }
    }

     // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.isNewRecord = false;
      this.router.navigate(['/planeTypes']);
    }
    this.editedPlaneType = null;
  }

    // удаление 
    delete() {
      this.service.delete(this.entity).subscribe(data => {
        this.router.navigate(['/planeTypes']);
      });
    }

}
