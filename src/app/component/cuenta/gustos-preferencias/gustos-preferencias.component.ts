import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gustos-preferencias',
  templateUrl: './gustos-preferencias.component.html',
  styleUrl: './gustos-preferencias.component.css'
})
export class GustosPreferenciasComponent {
  categoriasSeleccionadas: string[] = [];

  seleccionarCategoria(categoria: string) {
    if (this.categoriasSeleccionadas.includes(categoria)) {
      // Si la categoría ya está seleccionada, la quitamos
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(cat => cat !== categoria);
    } else {
      // Si no está seleccionada, la añadimos
      this.categoriasSeleccionadas.push(categoria);
    }
    console.log('Categorías seleccionadas:', this.categoriasSeleccionadas);
  }

  guardarPreferencias() {
    console.log('Preferencias guardadas:', this.categoriasSeleccionadas);
    // Aquí podrías enviar las preferencias seleccionadas a tu backend o hacer alguna otra acción
    alert('Preferencias guardadas con éxito');
  }
}
