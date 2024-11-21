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
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-nuevo',
  templateUrl: './event-nuevo.component.html',
  styleUrl: './event-nuevo.component.css'
})
export class EventNuevoComponent implements OnInit {
  form: FormGroup;
  ciudades: City[] = [];
  eventTypes: EventType[] = [];
  promotores: Promoter[] = [];
  selectedFile: any;
  imageUrl: any;

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private promotorService: PromotorService,
    private eventoService: EventoService,
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar,
    private router: Router
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
    this.ciudadService.getCiudades().subscribe((data) => (this.ciudades = data));
    this.promotorService.getPromotores().subscribe((data) => (this.promotores = data));
    this.tipoEventoService.getTipoEventos().subscribe((data) => (this.eventTypes = data));

  }

  SelectedFile(e: any){
    this.selectedFile = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
  }

  crear(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('accessCode', this.form.value['accessCode']);
      formData.append('capacity', this.form.value['capacity']);
      formData.append('address', this.form.value['address']);
      formData.append('city', this.form.value['city'].id);
      formData.append('eventType', this.form.value['eventType'].id);
      formData.append('promoter', this.form.value['promoter'].id);

      const startDate = new Date(this.form.value['startDate']).toISOString();
      const endDate = new Date(this.form.value['endDate']).toISOString();
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);

      formData.append('file', this.selectedFile);

      this.eventoService.add(formData).subscribe({
        next: () => {
          this.router.navigate(['/evento/listar']);
          this.snackBar.open('Evento registrada correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al registrar el evento', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos obligatorios', 'OK', { duration: 2000 });
    }
  }

  cancelar(): void {
    this.router.navigate(['/evento/listar']);
  }
}
