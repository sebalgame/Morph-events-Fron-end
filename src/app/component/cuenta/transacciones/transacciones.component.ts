import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Transaction } from '../../../models/transaccion';
import { TransactionService } from '../../../service/transaction.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit, AfterViewInit {

  dsTransactions = new MatTableDataSource<Transaction>();
  displayedColumns: string[] = ['id', 'fecha', 'monto', 'cantidad'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.cargarTransacciones();
  }

  constructor(private transactionService: TransactionService) {}

  ngAfterViewInit() {
    this.dsTransactions.paginator = this.paginator; 
  }
  cargarTransacciones() {
    this.transactionService.getTransaction().subscribe({
      next: (data: Transaction[]) => {
        console.log("Datos recibidos:", data);
        this.dsTransactions.data = data;
      },
      error: (err) => {
        console.error("Error al cargar datos:", err);
      }
    });
  }
  
}
