import { Component } from '@angular/core';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-fav-events',
  templateUrl: './fav-events.component.html',
  styleUrl: './fav-events.component.css'
})
export class FavEventsComponent {


  showFechaDropdown = false;
  showEventoDropdown = false;
  showPromotorDropdown = false;
  showCiudadDropdown = false;

  showDropdown: string | null = null;

  toggleDropdown(menu: string) {
    this.showDropdown = this.showDropdown === menu ? null : menu;
  }
  
  selectFilter(filter: string) {
    console.log('Selected:', filter);
    this.showDropdown = null; 
  }

}
