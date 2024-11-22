import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promoter } from '../models/promoter';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PromotorService {
  private ruta_servidor: string = `${environment.baseUrl}promoters`;

  constructor(private http: HttpClient) {}

  getPromotores(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>(`${this.ruta_servidor}/list`);
  }

  getById(id: number): Observable<Promoter> {
    return this.http.get<Promoter>(`${this.ruta_servidor}/${id}`);
  }

  add(promoter: Promoter): Observable<Promoter> {
    console.log(promoter);
    return this.http.post<Promoter>(`${this.ruta_servidor}/create`, promoter);
  }

  update(id: number, promoter: Promoter): Observable<Promoter> {
    return this.http.put<Promoter>(`${this.ruta_servidor}/edit/${id}`, promoter);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/force/${id}?forced=true`);
  }

}
