import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plane } from '../models/plane.model';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private url = "http://localhost:5000/api/planes";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  create(entity: Plane) {
    return this.http.post(this.url, entity);
  }

  update(id: number, entity: Plane) {
    return this.http.put(this.url + '/'+ id.toString(), entity);
  }

  delete(entity: Plane) {
    return this.http.delete(this.url + '/' + entity.id.toString());
  }
}
