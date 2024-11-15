import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  ruta_servidor: string = "http://localhost:8080/api/comments";

  constructor(private http: HttpClient) { }

  insertcomment(comment:Comment){
    return this.http.post<Comment>(this.ruta_servidor + "/" + "addcomment",comment);
  }

}
