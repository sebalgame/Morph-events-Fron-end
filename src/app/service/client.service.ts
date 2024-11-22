import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  ruta_servidor: string = environment.baseUrl +"clients";

  constructor(private http: HttpClient) { }

  insertClient(client: any) {
    return this.http.post<Client>(this.ruta_servidor + "/create", client);
  }
}
