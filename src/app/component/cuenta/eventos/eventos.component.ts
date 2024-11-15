import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  menuOpen = false;

  showFechaDropdown = false;
  showEventoDropdown = false;
  showPromotorDropdown = false;
  showCiudadDropdown = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    this.menuOpen = false; 
  }

  showDropdown: string | null = null;

  toggleDropdown(menu: string) {
    this.showDropdown = this.showDropdown === menu ? null : menu;
  }
  
  selectFilter(filter: string) {
    console.log('Selected:', filter);
    this.showDropdown = null;
  }
}
