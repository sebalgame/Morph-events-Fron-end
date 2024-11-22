import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventType } from '../../../models/eventType';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoEventoService } from '../../../service/tipoevento.service';
@Component({
  selector: 'app-event-type-nuevo',
  templateUrl: './event-type-nuevo.component.html',
  styleUrl: './event-type-nuevo.component.css'
})
export class EventTypeNuevoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.form = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      theme: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  grabar() {
    if (this.form.valid) {
      this.tipoEventoService.add(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/tipoevento/listar']);
          this.snackBar.open('Tipo de evento registrado correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al registrar el tipo de evento', 'OK', { duration: 3000 });
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
