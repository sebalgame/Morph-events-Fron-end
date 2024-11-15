import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.css'
})
export class VerPerfilComponent {
  categoriasSeleccionadas: string[] = [];
  biografia: string = '';
  firstName: string = '';
  lastName: string = '';

  isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  menuOpen = false;

  ngOnInit() {
    if (this.isLocalStorageAvailable()) {
      const categorias = localStorage.getItem('categoriasSeleccionadas');
      if (categorias) {
        this.categoriasSeleccionadas = JSON.parse(categorias);
      }

      const savedBiografia = localStorage.getItem('biografia');
      if (savedBiografia) {
        this.biografia = savedBiografia;
      }

      // Cargar nombre y apellido
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName) {
      this.firstName = firstName;
    }
    if (lastName) {
      this.lastName = lastName;
    }

    } else {
      console.warn('localStorage no está disponible');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    this.menuOpen = false; 
  }

}
