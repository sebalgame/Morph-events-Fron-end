import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  ruta_servidor: string = "http://localhost:8080/api/clients";

  constructor(private http: HttpClient) { }

  insertClient(client:Client){
    return this.http.post<Client>(this.ruta_servidor + "/" + "client",client);
  }
}
