import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Departure } from '../models/departure.model';

@Injectable({
  providedIn: 'root'
})
export class DeparturesService {

  private url = "http://localhost:5000/api/departures";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  create(entity: Departure) {
    return this.http.post(this.url, entity);
  }

  update(id: number, entity: Departure) {
    return this.http.put(this.url + '/'+ id.toString(), entity);
  }

  delete(entity: Departure) {
    return this.http.delete(this.url + '/' + entity.id.toString());
  }
}
