import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanesService } from '../../../services/planes.service';
import { Plane } from '../../../models/plane.model';

@Component({
  selector: 'app-plane-details',
  templateUrl: './planeDetails.component.html',
  styleUrls: ['./planeDetails.component.css'],
  providers: [PlanesService]
})
export class PlaneDetailsComponent implements OnInit {

    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<Plane>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<Plane>;

   id: number;
   private sub: any;
   entity: Plane;
   editedPlane: Plane;
   isNewRecord: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service:PlanesService) {
     
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
      this.editedPlane= new Plane(0, 0, '', 0, '');
      this.isNewRecord = true;
    }
  }

  private load() {
    this.service.getById(this.id).subscribe((data: Plane) => {
      this.entity = data;
      this.entity.releaseDate = this.entity.releaseDate.slice(0, 16);
      
    });
  }

    // загружаем один из двух шаблонов
    loadTemplate() {
      if (this.editedPlane) {
        return this.editTemplate;
      } else {
        return this.readOnlyTemplate;
      }
    }

      // редактирование
  edit() {
      this.editedPlane = this.entity;
  }

    // сохраняем 
    save() {
      if (this.isNewRecord) {
        // добавляем 
        this.service.create(this.editedPlane).subscribe(data => {
          this.isNewRecord = false;
          this.editedPlane = null;
          this.router.navigate(['/planes']);
        });
      } else {
        // изменяем 
        this.service.update(this.editedPlane.id, this.editedPlane).subscribe(data => {
          this.load();
          this.editedPlane = null;
        });
        
      }
    }

     // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.isNewRecord = false;
      this.router.navigate(['/planes']);
    }
    this.editedPlane = null;
  }

    // удаление 
    delete() {
      this.service.delete(this.entity).subscribe(data => {
        this.router.navigate(['/planes']);
      });
    }

}
