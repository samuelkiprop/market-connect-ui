import { CommonModule } from '@angular/common';
import { Component, signal, computed, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  label: string;
  path: string;
  roles: string[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent implements OnInit {
  user = signal<{ name: string; role: string } | null>(null);
  sidebarOpen = signal(false);

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      path: '/home/dashboard',
      roles: ['admin', 'affiliate', 'merchant', 'customer'],
    },
    { label: 'Users', path: '/home/users', roles: ['admin'] },
    {
      label: 'Products',
      path: '/home/products',
      roles: ['admin', 'merchant', 'customer'],
    },
    {
      label: 'Affiliate Links',
      path: '/home/affiliate-links',
      roles: ['admin', 'affiliate'],
    },
    {
      label: 'Transactions',
      path: '/home/transactions',
      roles: ['admin', 'affiliate', 'merchant', 'customer'],
    },
    {
      label: 'Commissions',
      path: '/home/commissions',
      roles: ['admin', 'affiliate'],
    },
    { label: 'Platform Stats', path: '/platform-stats', roles: ['admin'] },
  ];

  filteredMenuItems = computed(() =>
    this.menuItems.filter((item) =>
      item.roles.includes(this.user()?.role || '')
    )
  );

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user.set(JSON.parse(userData));
    }
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
