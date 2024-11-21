import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CiudadService } from '../../../service/ciudad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from '../../../models/city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-listar',
  templateUrl: './city-listar.component.html',
  styleUrls: ['./city-listar.component.css']
})
export class CityListarComponent implements OnInit {
  cities: MatTableDataSource<City> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ciudadService: CiudadService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCiudades();
  }

  ngAfterViewInit(): void {
    this.cities.paginator = this.paginator;
  }

  nuevo(){
    this.router.navigate(['/ciudad/nuevo']);
  }

  cargarDatos(item: City): void {
    this.router.navigate(['/ciudad/editar', item.id]);
  }

  cargarCiudades(): void {
    this.ciudadService.getCiudades().subscribe({
      next: (data: City[]) => {
        this.cities.data = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar ciudades', 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminarCiudad(id: number): void {
    this.ciudadService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Ciudad eliminada correctamente', 'Cerrar', { duration: 3000 });
        this.cargarCiudades();
      },
      error: () => {
        this.snackBar.open('Error al eliminar la ciudad', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cities.filter = filterValue.trim().toLowerCase();
  }
}
