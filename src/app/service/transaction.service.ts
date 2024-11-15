import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Transaction} from '../models/transaccion'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  ruta_servidor: string = "http://localhost:8080/api/transactions";

  constructor(private http: HttpClient) { }

  getTransaction(){
    return this.http.get<Transaction[]>(this.ruta_servidor + "/" + "list");
  }
}
