import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  constructor(private router: Router,
    private authService: AuthService
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/inicio-sesion/loguearse']);
  }
}
