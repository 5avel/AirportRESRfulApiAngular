import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlaneType } from '../models/planeType.model';

@Injectable({
  providedIn: 'root'
})
export class PlaneTypesService {

  private url = "http://localhost:5000/api/planeTypes";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  create(entity: PlaneType) {
    return this.http.post(this.url, entity);
  }

  update(id: number, entity: PlaneType) {
    return this.http.put(this.url + '/'+ id.toString(), entity);
  }

  delete(entity: PlaneType) {
    return this.http.delete(this.url + '/' + entity.id.toString());
  }
}
