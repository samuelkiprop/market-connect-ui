import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const user = this.authService.getUser(); 

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    switch (user.role) {
      case 'admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'affiliate':
        this.router.navigate(['/affiliate-dashboard']);
        break;
      case 'merchant':
        this.router.navigate(['/merchant-dashboard']);
        break;
      case 'customer':
        this.router.navigate(['/customer-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  }
}
