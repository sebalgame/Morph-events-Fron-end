import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../../models/city';
import { EventType } from '../../../models/eventType';
import { Promoter } from '../../../models/promoter';
import { CiudadService } from '../../../service/ciudad.service';
import { PromotorService } from '../../../service/promotor.service';
import { EventoService } from '../../../service/evento.service';
import { TipoEventoService } from '../../../service/tipoevento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-editar',
  templateUrl: './event-editar.component.html',
  styleUrl: './event-editar.component.css'
})
export class EventEditarComponent implements OnInit {
  form: FormGroup;
  ciudades: City[] = [];
  eventTypes: EventType[] = [];
  promotores: Promoter[] = [];
  selectedFile: any;
  imageUrl: any;
  eventoActual: any;

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private promotorService: PromotorService,
    public eventoService: EventoService,
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      accessCode: ['', [Validators.required, Validators.minLength(3)]],
      capacity: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      eventType: ['', Validators.required],
      promoter: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eventoService.getById(id).subscribe({
      next: (evento) => {
        console.log(evento);
        this.eventoActual = evento;
        this.form.patchValue({
          accessCode: evento.accessCode,
          capacity: evento.capacity,
          startDate: new Date(evento.startDate),
          endDate: new Date(evento.endDate),
          address: evento.address,
          city: evento.city?.id,
          eventType: evento.eventType?.id,
          promoter: evento.promoter?.id
        });
      },
      error: () => {
        this.snackBar.open('Error al cargar el evento', 'OK', { duration: 2000 });
        this.router.navigate(['/evento/listar']);
      }
    });

    this.ciudadService.getCiudades().subscribe((data) => (this.ciudades = data));
    this.promotorService.getPromotores().subscribe((data) => (this.promotores = data));
    this.tipoEventoService.getTipoEventos().subscribe((data) => (this.eventTypes = data));
  }

  SelectedFile(event: any): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
  }

  editar(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('accessCode', this.form.value['accessCode']);
      formData.append('capacity', this.form.value['capacity']);
      formData.append('address', this.form.value['address']);
      formData.append('city', this.form.value['city']);
      formData.append('eventType', this.form.value['eventType']);
      formData.append('promoter', this.form.value['promoter']);
      formData.append('startDate', new Date(this.form.value['startDate']).toISOString());
      formData.append('endDate', new Date(this.form.value['endDate']).toISOString());

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.eventoService.update(this.eventoActual.id, formData).subscribe({
        next: () => {
          this.router.navigate(['/evento/listar']);
          this.snackBar.open('Evento actualizado correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al actualizar el evento', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Complete todos los campos obligatorios', 'OK', { duration: 2000 });
    }
  }

  cancelar(): void {
    this.router.navigate(['/evento/listar']);
  }
}
