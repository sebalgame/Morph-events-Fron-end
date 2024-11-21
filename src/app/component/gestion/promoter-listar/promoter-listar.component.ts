import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PromotorService } from '../../../service/promotor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Promoter } from '../../../models/promoter';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-promoter-listar',
  templateUrl: './promoter-listar.component.html',
  styleUrls: ['./promoter-listar.component.css']
})
export class PromoterListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'details', 'actions'];
  dataSource: MatTableDataSource<Promoter> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private promotorService: PromotorService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPromotores();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarPromotores() {
    this.promotorService.getPromotores().subscribe({
      next: (data: Promoter[]) => {
        this.dataSource.data = data;
      },
      error: () =>
        this.snackBar.open('Error al cargar promotores', 'OK', { duration: 3000 }),
    });
  }

  nuevo() {
    this.router.navigate(['/promotor/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/promotor/editar', id]);
  }

  eliminar(id: number) {
    this.promotorService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Promotor eliminado', 'OK', { duration: 3000 });
        this.cargarPromotores();
      },
      error: () =>
        this.snackBar.open('Error al eliminar el promotor', 'OK', { duration: 3000 }),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
