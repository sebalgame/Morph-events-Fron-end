import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrl: './actualizar-datos.component.css'
})
export class ActualizarDatosComponent {
  menuOpen = false;
  biografia: string = '';


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    this.menuOpen = false; 
  }



  saveBiografia() {
    
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('biografia', this.biografia);
      alert("Biografía modificada con éxito.");
    }
  }

  client: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    age: 0,
    phone: '',
    dni: 0,
  }
  
  editMode: {
    id: boolean;
    firstName: boolean;
    lastName: boolean;
    gender: boolean;
    age: boolean;
    phone: boolean;
    dni: boolean;
  } = {
    id: false,
    firstName: false,
    lastName: false,
    gender: false,
    age: false,
    phone: false,
    dni: false
  };
  

  isLocalStorageAvailable() {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  ngOnInit() {
    if (this.isLocalStorageAvailable()) {
      // Cargar la biografía desde localStorage si está disponible
      const savedBiografia = localStorage.getItem('biografia');
      if (savedBiografia) {
        this.biografia = savedBiografia;
      }

      // Cargar los datos del cliente desde localStorage si está disponible
      this.client.firstName = localStorage.getItem('firstName') || '';
      this.client.lastName = localStorage.getItem('lastName') || '';
      this.client.gender = localStorage.getItem('gender') || '';
      this.client.age = Number(localStorage.getItem('age')) || 0;
      this.client.phone = localStorage.getItem('phone') || '';
      this.client.dni = Number(localStorage.getItem('dni')) || 0;
    } else {
      console.warn('localStorage no está disponible');
    }
  }


  enableEdit(field: keyof typeof this.editMode) {
    this.editMode[field] = true;
  }



  saveChanges() {

    if (this.isLocalStorageAvailable()) {

      localStorage.setItem('firstName', this.client.firstName);
      localStorage.setItem('lastName', this.client.lastName);
      localStorage.setItem('gender', this.client.gender);
      localStorage.setItem('age', this.client.age.toString());
      localStorage.setItem('phone', this.client.phone);
      localStorage.setItem('dni', this.client.dni.toString());
      
      alert('Tus cambios han sido guardados exitosamente.');
    }
  }

  resetEditMode() {
    Object.keys(this.editMode).forEach(key => {
    this.editMode[key as keyof typeof this.editMode] = false;
  });
  }
}
