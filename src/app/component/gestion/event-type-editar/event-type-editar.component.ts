import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventType } from '../../../models/eventType';
import { TipoEventoService } from '../../../service/tipoevento.service';

@Component({
  selector: 'app-event-type-editar',
  templateUrl: './event-type-editar.component.html',
  styleUrl: './event-type-editar.component.css'
})
export class EventTypeEditarComponent implements OnInit {
  form!: FormGroup;
  tipoEventoId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.tipoEventoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.crearFormulario();
    this.getTipoEventoById();
  }

  crearFormulario() {
    this.form = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      theme: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getTipoEventoById() {
    this.tipoEventoService.getById(this.tipoEventoId).subscribe({
      next: (tipoEvento) => {
        this.form.patchValue(tipoEvento);
      },
      error: () => {
        this.snackBar.open('No se pudo cargar la información del tipo de evento', 'OK', { duration: 3000 });
      }
    });
  }

  grabar() {
    if (this.form.valid) {
      this.tipoEventoService.update(this.tipoEventoId, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/tipoevento/listar']);
          this.snackBar.open('Tipo de evento actualizado correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al actualizar el tipo de evento', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos obligatorios', 'OK', { duration: 2000 });
    }
  }

  cancelar() {
    this.router.navigate(['/tipoevento/listar']);
  }
}
