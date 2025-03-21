import { Component, inject, OnInit, signal } from '@angular/core';
import { User, UserService } from '../../core/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  isDeleteModalOpen = false;
  selectedUser: any = null;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users.');
        this.loading.set(false);
      },
    });
  }

  openDeleteModal(user: any) {
    this.selectedUser = user;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.selectedUser = null;
  }

  confirmDelete() {
    if (!this.selectedUser) return;

    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.users.set(
          this.users().filter((user) => user.id !== this.selectedUser.id)
        );
        this.closeDeleteModal();
        this.loadUsers();
      },
      error: () => {
        alert('Failed to delete user.');
      },
    });
  }
}
