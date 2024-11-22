import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventType } from '../models/eventType';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TipoEventoService {
  ruta_servidor: string = environment.baseUrl +"event-types";

  constructor(private http: HttpClient) { }

  getTipoEventos() {
      return this.http.get<EventType[]>(this.ruta_servidor + "/" + "list");
  }

  getById(id: number): Observable<EventType> {
    return this.http.get<EventType>(`${this.ruta_servidor}/${id}`);
  }

  add(eventType: EventType): Observable<EventType> {
    return this.http.post<EventType>(`${this.ruta_servidor}/create`, eventType);
  }

  update(id: number, eventType: EventType): Observable<EventType> {
    return this.http.put<EventType>(`${this.ruta_servidor}/edit/${id}`, eventType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/force/${id}?forced=true`);
  }
}
