import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showCampanasMenu: boolean = false;
  showDestMenu: boolean = false;

  toggleMenu(menu: string) {
    if (menu === 'Campañas') {
      this.showCampanasMenu = !this.showCampanasMenu;
      if (this.showCampanasMenu) {
        this.showDestMenu = false; // Cerrar otros menús si es necesario
      }
    } else if (menu === 'Destinatarios') {
      this.showDestMenu = !this.showDestMenu;
      if (this.showDestMenu) {
        this.showCampanasMenu = false; // Cerrar otros menús si es necesario
      }
    }
  }

}
