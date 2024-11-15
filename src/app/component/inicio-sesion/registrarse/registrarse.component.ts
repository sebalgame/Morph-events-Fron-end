import { Component } from '@angular/core';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  onRegister(): void {
    console.log('Registrarse');
    // Aquí manejas el registro de usuario o la navegación
  }
}
