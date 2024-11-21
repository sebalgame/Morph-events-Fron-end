import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketTypeService } from '../../../service/Tickettype.service';
import { EventMF } from '../../../models/event';
import { EventoService } from '../../../service/evento.service';

@Component({
  selector: 'app-ticket-type-nuevo',
  templateUrl: './ticket-type-nuevo.component.html',
  styleUrl: './ticket-type-nuevo.component.css'
})
export class TicketTypeNuevoComponent implements OnInit {
  form!: FormGroup;
  eventos: EventMF[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketTypeService: TicketTypeService,
    private eventoService: EventoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarEventos();
  }

  crearFormulario() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      availableQuantity: [0, [Validators.required, Validators.min(1)]],
      event: [null, [Validators.required]]
    });
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: () =>
        this.snackBar.open('Error al cargar los eventos', 'OK', { duration: 3000 }),
    });
  }

  grabar() {
    if (this.form.valid) {
      const params = {
        name: this.form.get('name')?.value,
        price: this.form.get('price')?.value,
        availableQuantity: this.form.get('availableQuantity')?.value,
        event: {
          id: this.form.get('event')?.value
        }
      };

      this.ticketTypeService.add(params).subscribe({
        next: () => {
          this.snackBar.open('Tipo de ticket registrado correctamente', 'OK', { duration: 3000 });
          this.router.navigate(['/tipoticket/listar']);
        },
        error: () => {
          this.snackBar.open('Error al registrar el tipo de ticket', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Complete todos los campos obligatorios', 'OK', { duration: 2000 });
    }
  }

  cancelar() {
    this.router.navigate(['/tipoticket/listar']);
  }
}
