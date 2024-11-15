import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../service/comment.service';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  menuOpen = false;
  selectedCommentType: string = 'Seleccionar Tipo de Comentario'; // Valor inicial del botón
  description: string = '';

  constructor(private commentService: CommentService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    this.selectedCommentType = option; // Actualiza el texto del botón
    this.menuOpen = false;
  }

  enviarComentario() {
    if (this.selectedCommentType && this.description) {
      const comment: Comment = {
        id: 0,
        commentType: this.selectedCommentType,
        description: this.description
      };

      this.commentService.insertcomment(comment).subscribe(
        (response) => {
          console.log("Comentario guardado:", response);
          alert("Tu comentario ha sido enviado.");
          this.resetForm();
        },
        (error) => {
          console.error("Error al enviar el comentario:", error);
          alert("Hubo un problema al enviar el comentario.");
        }
      );
    } else {
      alert("Por favor, selecciona un tipo de comentario y escribe tu comentario.");
    }
  }

  resetForm() {
    this.selectedCommentType = 'Seleccionar Tipo de Comentario';
    this.description = '';
  }
  
}