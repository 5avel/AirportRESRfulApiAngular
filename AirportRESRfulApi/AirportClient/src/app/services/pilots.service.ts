import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pilot } from '../models/pilot.model';

@Injectable({
  providedIn: 'root'
})
export class PilotsService {

  private url = "http://localhost:5000/api/pilots";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  create(entity: Pilot) {
    return this.http.post(this.url, entity);
  }

  update(id: number, entity: Pilot) {
    return this.http.put(this.url + '/'+ id.toString(), entity);
  }

  delete(entity: Pilot) {
    return this.http.delete(this.url + '/' + entity.id.toString());
  }
}
