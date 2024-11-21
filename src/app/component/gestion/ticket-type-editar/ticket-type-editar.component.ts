import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketTypeService } from '../../../service/Tickettype.service';
import { EventoService } from '../../../service/evento.service';
import { EventMF } from '../../../models/event';

@Component({
  selector: 'app-ticket-type-editar',
  templateUrl: './ticket-type-editar.component.html',
  styleUrl: './ticket-type-editar.component.css'
})
export class TicketTypeEditarComponent implements OnInit {
  form!: FormGroup;
  eventos: EventMF[] = [];
  ticketTypeId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketTypeService: TicketTypeService,
    private eventoService: EventoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarEventos();
    this.cargarTicketType();
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

  cargarTicketType() {
    this.ticketTypeId = +this.route.snapshot.paramMap.get('id')!;
    this.ticketTypeService.getById(this.ticketTypeId).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.name,
          price: data.price,
          availableQuantity: data.availableQuantity,
          event: data.event.id
        });
      },
      error: () => {
        this.snackBar.open('Error al cargar los datos del ticket', 'OK', { duration: 3000 });
        this.router.navigate(['/tipoticket/listar']);
      }
    });
  }

  actualizar() {
    if (this.form.valid) {
      const params = {
        id: this.ticketTypeId,
        name: this.form.get('name')?.value,
        price: this.form.get('price')?.value,
        availableQuantity: this.form.get('availableQuantity')?.value,
        event: {
          id: this.form.get('event')?.value
        }
      };

      this.ticketTypeService.update(params.id, params).subscribe({
        next: () => {
          this.snackBar.open('Tipo de ticket actualizado correctamente', 'OK', { duration: 3000 });
          this.router.navigate(['/tipoticket/listar']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar el tipo de ticket', 'OK', { duration: 3000 });
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
