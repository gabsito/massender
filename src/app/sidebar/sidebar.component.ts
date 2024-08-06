import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  routes: any[] = []

  showMenu: boolean = false;
  showCampaniasMenu: boolean = false; // Asegúrate de inicializar showCampaniasMenu
  showDestMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentRoutes.subscribe(
      (data) => {
        console.log('rutas sidebar:', data);
        this.routes = data as any[];
      }
    );
  }

  toggleMenu(menu: string) {
    if (menu === 'Campañas') {
      this.showCampaniasMenu = !this.showCampaniasMenu;
      if (this.showCampaniasMenu) {
        this.showMenu = false; // Cerrar otros menús si es necesario
      }
    } else if (menu === 'Destinatarios') {
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        this.showCampaniasMenu = false; // Cerrar otros menús si es necesario
      }
    }
  }

  toggleCampaniasMenu() {
    this.showCampaniasMenu = !this.showCampaniasMenu;
    this.router.navigate(['/dashboard/campanias']); // Navega al componente de Campanias
  }

  toggleDestMenu() {
    this.showDestMenu = !this.showDestMenu;
    this.router.navigate(['/dashboard/destinatarios']); // Navega al componente de Destinatarios
  }

  navigateTo(submenu: string) {
    // Aquí podrías manejar la navegación a diferentes subcomponentes si los tienes
    console.log(`Navigate to ${submenu}`);
    this.router.navigate(['/dashboard/campanias/creacion']);
    // Implementar la lógica de navegación según tus necesidades
  }

  logout() {
    this.authService.logout();
  }
}
