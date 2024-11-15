import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurcharsedTickets } from '../models/PurcharsedTickets';

@Injectable({
  providedIn: 'root'
})
export class PurcharsedTicketsService {
  ruta_servidor: string = "http://localhost:8080/api/purchased-tickets";

  constructor(private http: HttpClient) { }

  getpurcharsedticket(){
    return this.http.get<PurcharsedTickets[]>(this.ruta_servidor + "/" + "list");
  }

}
