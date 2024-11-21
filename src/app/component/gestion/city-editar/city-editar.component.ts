import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiudadService } from '../../../service/ciudad.service';

@Component({
  selector: 'app-city-editar',
  templateUrl: './city-editar.component.html',
  styleUrls: ['./city-editar.component.css']
})
export class CityEditarComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ciudadService: CiudadService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Obtener ID desde la URL
    this.crearFormulario();
    this.cargarCiudad();
  }

  crearFormulario() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  cargarCiudad() {
    this.ciudadService.getById(this.id).subscribe({
      next: (data) => {
        this.form.patchValue(data);
      },
      error: () => {
        this.snackBar.open('Ocurrió un error al cargar la ciudad', 'OK', { duration: 3000 });
        this.router.navigate(['/ciudad/listar']); 
      }
    });
  }

  editar() {
    if (this.form.valid) {
      this.ciudadService.update(this.id, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/ciudad/listar']);
          this.snackBar.open('Ciudad actualizada correctamente', 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Ocurrió un error al actualizar la ciudad', 'OK', { duration: 3000 });
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
