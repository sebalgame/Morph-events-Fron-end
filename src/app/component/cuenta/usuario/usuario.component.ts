import { Client } from '../../../models/client';
import { ClientService } from '../../../service/client.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  menuOpen = false;

  toggleMenu() {
      this.menuOpen = !this.menuOpen;
  }
  
  selectOption(option: string) {
      this.menuOpen = false; 
  }
  
  deleteAccount() {
      const confirmDelete = confirm("¿Estás seguro de que quieres eliminar tu cuenta?");
      if (confirmDelete) {
        console.log("Account deleted.");
        alert("Tu cuenta ha sido eliminada.");
      }
  }

  client: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    age: 0,
    phone: '',
    dni: 0
  };
  constructor(private clientService: ClientService) {}
  saveChanges() {
    this.clientService.insertClient(this.client).subscribe(
      (response) => {
        console.log("Cliente guardado:", response);
        alert("Tus cambios han sido guardados.");
      },
      (error) => {
        console.error("Error al guardar el cliente:", error);
        alert("Hubo un problema al guardar los cambios.");
      }
    );
  }
}