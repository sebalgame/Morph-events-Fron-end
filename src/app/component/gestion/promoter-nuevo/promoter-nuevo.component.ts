import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromotorService } from '../../../service/promotor.service';

@Component({
  selector: 'app-promoter-nuevo',
  templateUrl: './promoter-nuevo.component.html',
  styleUrls: ['./promoter-nuevo.component.css']
})
export class PromoterNuevoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private promotorService: PromotorService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.form = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  grabar() {
    if (this.form.valid) {
      this.promotorService.add(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/promotor/listar']);
          this.snackBar.open('Promotor registrado correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al registrar el promotor', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos obligatorios', 'OK', { duration: 2000 });
    }
  }

  cancelar() {
    this.router.navigate(['/promotor/listar']);
  }
}
