import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CiudadService {
  ruta_servidor: string = environment.baseUrl +"cities";

  constructor(private http: HttpClient) { }

  getCiudades() {
      return this.http.get<City[]>(this.ruta_servidor + "/" + "list");
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.ruta_servidor+"/force/"+id+"?forced=true");
  }

  add(obj: City): Observable<City> {
    console.log(obj);
    return this.http.post<City>(this.ruta_servidor+"/create", obj);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.ruta_servidor}/${id}`);
  }

  update(id: number, ciudad: any): Observable<any> {
    return this.http.put(`${this.ruta_servidor}/edit/${id}`, ciudad);
  }
}
