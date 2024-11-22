import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  ruta_servidor: string = environment.baseUrl +"comments";

  constructor(private http: HttpClient) { }

  insertcomment(comment:Comment){
    return this.http.post<Comment>(this.ruta_servidor + "/" + "addcomment",comment);
  }

}
