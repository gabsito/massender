import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../core/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if( inject(AuthService).isAuthenticated()) {
    return true;
  }
  inject(AuthService).logout();
  return false;
};
