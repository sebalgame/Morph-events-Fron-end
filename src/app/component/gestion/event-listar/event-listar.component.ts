import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../service/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EventMF } from '../../../models/event';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-event-listar',
  templateUrl: './event-listar.component.html',
  styleUrl: './event-listar.component.css'
})
export class EventListarComponent implements OnInit {
  displayedColumns: string[] = ['id','image', 'capacity','accessCode','startDate', 'endDate', 'city',"typeEvent", 'actions'];
  dataSource: MatTableDataSource<EventMF> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private eventoService: EventoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe({
      next: (data: EventMF[]) => {
        this.dataSource.data = data;
      },
      error: () =>
        this.snackBar.open('Error al cargar eventos', 'OK', { duration: 3000 }),
    });
  }

  nuevo() {
    this.router.navigate(['/evento/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/evento/editar', id]);
  }

  eliminar(id: number) {
    this.eventoService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Evento eliminado', 'OK', { duration: 3000 });
        this.cargarEventos();
      },
      error: () =>
        this.snackBar.open('Error al eliminar el evento', 'OK', { duration: 3000 }),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getImagen(image: string){
    return this.eventoService.getImage(image);
  }
}
