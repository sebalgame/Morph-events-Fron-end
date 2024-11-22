import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/user.service';
import { ClientService } from '../../../service/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private clienteService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['M', [Validators.required]],
      age: [null, [Validators.required, Validators.min(18)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onRegister(): Promise<void> {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
        console.log('clientData', clientData);

        const params = {
          firstName:this.clientForm.value['firstName'],
          lastName:this.clientForm.value['lastName'],
          gender:this.clientForm.value['gender'],
          age:this.clientForm.value['age'],
          phone:this.clientForm.value['phone'],
          dni:this.clientForm.value['dni'],
          user:{
            username:this.clientForm.value['username'],
            password:this.clientForm.value['password']
          }
        };

        this.clienteService.insertClient(params).subscribe(
          (response) => {

            this.snackBar.open('Cliente registrado correctamente', 'Cerrar', { duration: 3000 });
            this.clientForm.reset({
              gender: 'M', 
            });
          },
          (error) => {
            this.snackBar.open('Error al registrar cliente', 'Cerrar', { duration: 3000 });
          }
        );
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
}
