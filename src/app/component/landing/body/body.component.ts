import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  showDropdown = false;
  selectedDay = 'Sábado';

  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.showDropdown = false;
  }

  //--------------------------------------------------------------

  titleText = "Morph Events: Conecta con tus Fiestas y Eventos Perfectos";  
  descriptionText = "Olvídate de asistir a eventos que no disfrutas. Morph Events analiza lo que realmente te gusta y te ofrece opciones de entretenimiento hechas a tu medida.";  // Descripción que se escribirá

  ngOnInit(): void {
    this.typeEffect('titulo', this.titleText, 50);
    setTimeout(() => {
      this.typeEffect('descripcion', this.descriptionText, 30);
    }, 2000);
  }

  typeEffect(elementId: string, text: string, speed: number): void {
    let i = 0;
    const element = document.getElementById(elementId); 
    if (element) {
      const typing = () => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        }
      };
      typing();
    }
  }
}
