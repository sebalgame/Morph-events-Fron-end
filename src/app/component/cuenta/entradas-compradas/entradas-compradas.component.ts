import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PurcharsedTickets } from '../../../models/PurcharsedTickets';
import { PurcharsedTicketsService } from '../../../service/purcharsed-tickets.service';


@Component({
  selector: 'app-entradas-compradas',
  templateUrl: './entradas-compradas.component.html',
  styleUrl: './entradas-compradas.component.css'
})
export class EntradasCompradasComponent implements OnInit, AfterViewInit{
  dsEntradas = new MatTableDataSource<PurcharsedTickets>();
  displayedColumns: string[] = ['id', 'precio', 'fecha'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private purcharsedTicketsService: PurcharsedTicketsService) {}

  ngOnInit() {
    this.cargarEntradas();
  }
  
  ngAfterViewInit() {
    this.dsEntradas.paginator = this.paginator;
  }

  cargarEntradas() {
    this.purcharsedTicketsService.getpurcharsedticket().subscribe({
      next: (data: PurcharsedTickets[]) => {
        console.log("Datos recibidos:", data);
        this.dsEntradas.data = data;
      },
      error: (err) => {
        console.error("Error al cargar datos:", err);
      }
    });
  }
  
  
}
