import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../core/auth.service';
// import { User } from '../interfaces/user';

export const authGuard: CanActivateFn = (route, state) => {
  if( inject(AuthService).isAuthenticated()) {
    return true;
  }
  inject(AuthService).logout();
  return false;
};

export const AdminGuard: CanActivateFn = (route, state) => {
  if( inject(AuthService).isAuthenticated() && isAdmin()) {
    return true;
  }
  inject(AuthService).logout();
  return false;
};

export const SuperAdminGuard: CanActivateFn = (route, state) => {
  if( inject(AuthService).isAuthenticated() && isSuperAdmin()) {
    return true;
  }
  inject(AuthService).logout();
  return false;
}

export const EmpleadoGuard: CanActivateFn = (route, state) => {
  if( inject(AuthService).isAuthenticated() && isEmpleado()) {
    return true;
  }
  inject(AuthService).logout();
  return false;
}

// FOR TESTING ONLY
function isSuperAdmin(): any {
  return true;
}

function isAdmin(): any {
  return true;
}

function isEmpleado(): any {
  return true;
}

  //TODO: Implementar la obtención del rol del usuario
  // inject(AuthService).getAccess().subscribe(
  //   (data) => {
  //     console.log(data);
  //     const user = data as User;
  //     if(user.rol.descripcion === 'admin') {
  //       return true;
  //     }
  //     return false;
  //   },
  //   (error) => {
  //     console.error('Error al obtener el rol:', error);
  //     return false;
  //   }
  // );
