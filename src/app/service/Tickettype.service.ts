import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurcharsedTickets } from '../models/PurcharsedTickets';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { TicketType } from '../models/Tickettype';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {
  private ruta_servidor: string = environment.baseUrl + 'ticket-types';

  constructor(private http: HttpClient) { }

  getTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(this.ruta_servidor + "/list");
  }

  getById(id: number): Observable<TicketType> {
    return this.http.get<TicketType>(`${this.ruta_servidor}/${id}`);
  }

  add(ticketType: any): Observable<TicketType> {
    console.log('ticketType',ticketType);
    return this.http.post<TicketType>(`${this.ruta_servidor}/create`, ticketType);
  }

  update(id: number, ticketType: any): Observable<TicketType> {
    return this.http.put<TicketType>(`${this.ruta_servidor}/edit/${id}`, ticketType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/force/${id}?forced=true`);
  }
}
