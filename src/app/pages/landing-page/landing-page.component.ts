import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (this.authService.getUser()) {
      this.router.navigate(['/home']);
    }
  }
}
