import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stewardess } from '../models/stewardess.model';

@Injectable({
  providedIn: 'root'
})
export class StewardessesService {

  private url = "http://localhost:5000/api/stewardesses";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  create(entity: Stewardess) {
    return this.http.post(this.url, entity);
  }

  update(id: number, entity: Stewardess) {
    return this.http.put(this.url + '/'+ id.toString(), entity);
  }

  delete(entity: Stewardess) {
    return this.http.delete(this.url + '/' + entity.id.toString());
  }
}
