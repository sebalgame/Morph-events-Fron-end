import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromotorService } from '../../../service/promotor.service';
import { Promoter } from '../../../models/promoter';

@Component({
  selector: 'app-promoter-editar',
  templateUrl: './promoter-editar.component.html',
  styleUrls: ['./promoter-editar.component.css']
})
export class PromoterEditarComponent implements OnInit {
  form!: FormGroup;
  promotorId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private promotorService: PromotorService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.promotorId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.crearFormulario();
    this.getPromotorById();
  }

  crearFormulario() {
    this.form = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getPromotorById() {
    this.promotorService.getById(this.promotorId).subscribe({
      next: (promotor) => {
        this.form.patchValue(promotor);
      },
      error: () => {
        this.snackBar.open('No se pudo cargar la información del promotor', 'OK', { duration: 3000 });
      }
    });
  }

  grabar() {
    if (this.form.valid) {
      this.promotorService.update(this.promotorId, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/promotor/listar']);
          this.snackBar.open('Promotor actualizado correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al actualizar el promotor', 'OK', { duration: 3000 });
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
