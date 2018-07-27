import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private url = "http://localhost:5000/api/tickets";

  constructor(private http: HttpClient) { }

  getAll() {
    let entitys = this.http.get(this.url);
    return entitys;
  }

  getById(id: number){
    let entity = this.http.get(this.url+'/'+id);
    return entity;
  }

  buyById(id: number){
    let entity = this.http.get(this.url+'/Buy/'+id);
    return entity;
  }
  
  returnById(id: number){
    let entity = this.http.get(this.url+'/Return/'+id);
    return entity;
  }

  getNotSoldSByFlightIdAndDateAsync(id: number, data: string){
    let entitys = this.http.get(this.url + '/' + id + '/' + data);
    return entitys;
  }


}
