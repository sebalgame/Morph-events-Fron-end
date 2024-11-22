import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { ApiService } from '../../../service/user.service';
import { AuthService } from '../../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loguearse',
  templateUrl: './loguearse.component.html',
  styleUrls: ['./loguearse.component.css']
})
export class LoguearseComponent {
  user: User = new User('', '');

  constructor(private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private tsSnackBar: MatSnackBar) { }

  onLogin(): void {
    this.apiService.login(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.saveLogin(response);
        this.tsSnackBar.open('Inicio de sesión correcto', 'Cerrar', { duration: 3000 });

        if(response.authorities == 'ADMIN'){
          this.router.navigate(['/ciudad/listar']);
        }else{
          this.router.navigate(['/cuenta/bievenidos']);
        }
      },
      error: (err) => {
        this.tsSnackBar.open('Credenciales incorrectas. Intenta nuevamente.', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
