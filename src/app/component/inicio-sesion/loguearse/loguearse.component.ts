import { Component } from '@angular/core';

@Component({
  selector: 'app-loguearse',
  templateUrl: './loguearse.component.html',
  styleUrl: './loguearse.component.css'
})
export class LoguearseComponent {
  onLogin(): void {

    console.log("Iniciar sesión");
  }

  

}
