import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventType } from '../../../models/eventType';
import { Router } from '@angular/router';
import { TipoEventoService } from '../../../service/tipoevento.service';

@Component({
  selector: 'app-event-type-listar',
  templateUrl: './event-type-listar.component.html',
  styleUrl: './event-type-listar.component.css'
})
export class EventTypeListarComponent implements OnInit {
  tipoEventos: MatTableDataSource<EventType> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'eventName', 'theme', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTipoEventos();
  }

  ngAfterViewInit(): void {
    this.tipoEventos.paginator = this.paginator;
  }

  cargarTipoEventos(): void {
    this.tipoEventoService.getTipoEventos().subscribe({
      next: (data: EventType[]) => {
        console.log(data);
        this.tipoEventos.data = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar los tipos de evento', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editarTipoEvento(item: EventType): void {
    this.router.navigate(['/tipoevento/editar', item.id]);
  }

  eliminarTipoEvento(id: number): void {
    this.tipoEventoService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Tipo de evento eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.cargarTipoEventos();
      },
      error: () => {
        this.snackBar.open('Error al eliminar el tipo de evento', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tipoEventos.filter = filterValue.trim().toLowerCase();
  }


}
