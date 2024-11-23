import { Component,OnInit  } from '@angular/core';
import { Promoter } from '../../../models/promoter';
import { EventType } from '../../../models/eventType';
import { EventMF } from '../../../models/event';
import { CiudadService } from './../../../service/ciudad.service';
import { AuthService } from './../../../auth.service';
import { PromotorService } from './../../../service/promotor.service';
import { TipoEventoService } from './../../../service/tipoevento.service';
import { EventoService } from './../../../service/evento.service';
import { City } from './../../../models/city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent  implements OnInit{
  menuOpen = false;

  showFechaDropdown = false;
  showEventoDropdown = false;
  showPromotorDropdown = false;
  showCiudadDropdown = false;

  ciudades: City[] = [];
  promotores: Promoter[] = [];
  tipoeventos: EventType[] = [];
  eventos: EventMF[] = [];

  filteredEventos = this.eventos;

  constructor(private ciudadService: CiudadService,
    private authService: AuthService,
    private promotorService:PromotorService,
    private tipoeventoService:TipoEventoService,
    private router: Router,
    private eventoService:EventoService) {}

  ngOnInit(): void {
    this.cargarCiudades();
    this.cargarPromotores();
    this.cargarTipoEventos();
    this.cargarEventos();
  }

  getImagen(image: string){
    return this.eventoService.getImage(image);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    this.menuOpen = false;
  }

  showDropdown: string | null = null;

  toggleDropdown(menu: string) {
    this.showDropdown = this.showDropdown === menu ? null : menu;
  }

  filtrar_porciudad(cityId: number): void {
    this.filteredEventos = this.eventos.filter(evento => evento.city?.id === cityId);

    if (this.filteredEventos.length === 0) {
      this.filteredEventos = this.eventos;
    }
  }

  filtrar_porTipoPromotor(tipoId: number): void {

    this.filteredEventos = this.eventos.filter(evento => evento.eventType?.id === tipoId);

    if (this.filteredEventos.length === 0) {
      this.filteredEventos = this.eventos;
    }
  }

  filtrar_porPromotor(promotorId: number): void {

    this.filteredEventos = this.eventos.filter(evento => evento.promoter?.id === promotorId);

    if (this.filteredEventos.length === 0) {
      this.filteredEventos = this.eventos;
    }
  }

  cargarCiudades() {
    const token = this.authService.getToken();
    if (token) {
      this.ciudadService.getCiudades().subscribe({
        next: (data: City[]) => {
          console.log("Ciudades recibidas:", data);
          this.ciudades = data;
        },
        error: (err) => {
          console.error("Error al cargar ciudades:", err);
        }
      });
    }
  }

  cargarPromotores() {
    const token = this.authService.getToken();
    if (token) {
      this.promotorService.getPromotores().subscribe({
        next: (data: Promoter[]) => {
          this.promotores = data;
        },
        error: (err) => {
          console.error("Error al cargar promotores:", err);
        }
      });
    }
  }

  cargarEventos() {
    const token = this.authService.getToken();
    if (token) {
      this.eventoService.getEventos().subscribe({
        next: (data: EventMF[]) => {
          this.filteredEventos=data;
          this.eventos = data.map(evento => this.setDateFields(evento));
        },
        error: (err) => {
          console.error("Error al cargar eventos:", err);
        }
      });
    }
  }

  setDateFields(evento: EventMF): EventMF {
    const date = new Date(evento.startDate);
    evento.mes = date.toLocaleString('es-ES', { month: 'long' });
    evento.dia = date.getDate().toString();
    return evento;
  }


  cargarTipoEventos(){
    const token = this.authService.getToken();
    if (token) {
      this.tipoeventoService.getTipoEventos().subscribe({
        next: (data: EventType[]) => {
          this.tipoeventos = data;
        },
        error: (err) => {
          console.error("Error al cargar tipo de eventos:", err);
        }
      });
    }
  }

  agruparEventos(array: any[], tamaño: number): any[][] {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamaño) {
      grupos.push(array.slice(i, i + tamaño));
    }
    return grupos;
  }

  comprar(item: EventMF){
    this.router.navigate(['/verticket/evento', item.id]);
  }
}
