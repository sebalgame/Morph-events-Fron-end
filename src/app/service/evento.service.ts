import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventMF } from '../models/event';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    ruta_servidor: string = environment.baseUrl + "events";

    constructor(private http: HttpClient) { }

    getEventos() {
        return this.http.get<EventMF[]>(this.ruta_servidor + "/" + "list");
    }

    getById(id: number): Observable<EventMF> {
      return this.http.get<EventMF>(`${this.ruta_servidor}/${id}`);
    }

    add(data: any) {
      console.log(data);
      return this.http.post<EventMF>(`${this.ruta_servidor}/create`, data);
    }

    update(id: number, data: any): Observable<EventMF> {
      return this.http.put<EventMF>(`${this.ruta_servidor}/update/${id}`, data);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ruta_servidor}/delete/${id}`);
    }

    getImage(image: string){
      return this.ruta_servidor + '/archivos/' + image;
   }
}
