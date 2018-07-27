import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Crew } from '../models/crew.model';

@Injectable({
  providedIn: 'root'
})
export class CrewsService {

  private url = "http://localhost:5000/api/crews";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  create(entity: Crew) {
    return this.http.post(this.url, entity);
  }

  update(id: number, entity: Crew) {
    return this.http.put(this.url + '/'+ id.toString(), entity);
  }

  delete(entity: Crew) {
    return this.http.delete(this.url + '/' + entity.id.toString());
  }
}
