import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiudadService } from '../../../service/ciudad.service';

@Component({
  selector: 'app-city-nuevo',
  templateUrl: './city-nuevo.component.html',
  styleUrls: ['./city-nuevo.component.css']
})
export class CityNuevoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ciudadService: CiudadService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  grabar() {
    if (this.form.valid) {
      this.ciudadService.add(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/ciudad/listar']);
          this.snackBar.open('Ciudad registrada correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al registrar la ciudad', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos obligatorios', 'OK', { duration: 2000 });
    }
  }

  cancelar() {
    this.router.navigate(['/ciudad/listar']);
  }
}
