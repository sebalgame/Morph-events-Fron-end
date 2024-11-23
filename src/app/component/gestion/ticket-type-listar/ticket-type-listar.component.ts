import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TicketType } from '../../../models/Tickettype';
import { TicketTypeService } from '../../../service/Tickettype.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ticket-type-listar',
  templateUrl: './ticket-type-listar.component.html',
  styleUrls: ['./ticket-type-listar.component.css']
})
export class TicketTypeListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'availableQuantity','event', 'actions'];
  dataSource: MatTableDataSource<TicketType> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ticketTypeService: TicketTypeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTicketTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarTicketTypes() {
    this.ticketTypeService.getTicketTypes().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: () =>
        this.snackBar.open('Error al cargar tipos de boletos', 'OK', { duration: 3000 }),
    });
  }

  nuevo() {
    this.router.navigate(['/tipoticket/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/tipoticket/editar', id]);
  }

  eliminar(id: number) {
    this.ticketTypeService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Tipo de boleto eliminado', 'OK', { duration: 3000 });
        this.cargarTicketTypes();
      },
      error: () =>
        this.snackBar.open('Error al eliminar el tipo de boleto', 'OK', { duration: 3000 }),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
