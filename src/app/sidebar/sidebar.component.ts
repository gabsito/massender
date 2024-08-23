import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../services/user.service';


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
  nombreUsuario: string = '';
  isOpen: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.authService.getUserAccess();
    this.authService.currentRoutes.subscribe(
      (data) => {
        console.log('rutas sidebar:', data);
        this.routes = data as any[];
      }
    );
  }

  ngOnInit() {
    this.nombreUsuario = this.userService.getUsername() || '';
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

  showSubmenu(menu: any) {
    this.isOpen = menu;
    console.log('isOpen:', this.isOpen);
  }

  hideAll() {
    this.isOpen = null;
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
