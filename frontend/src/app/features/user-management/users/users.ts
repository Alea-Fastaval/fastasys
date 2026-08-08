import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User, Role, CreateUserDto, UpdateUserDto } from '@shared/types';
import { Badge, Card } from '@shared/components';
import { TranslatePipe } from '@shared/pipes';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    Badge,
    Card,
    TranslatePipe,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public readonly users = signal<User[]>([]);
  public readonly availableRoles = signal<Role[]>([]);
  public readonly showUserModal = signal<boolean>(false);
  public readonly editingUserId = signal<number | null>(null);

  public searchQuery = '';
  public userColumns = ['id', 'username', 'fullName', 'email', 'roles', 'status', 'actions'];

  public formUser: CreateUserDto = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    isActive: true,
    roleIds: [],
  };

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  public loadUsers(): void {
    const url = this.searchQuery ? `/api/users?search=${encodeURIComponent(this.searchQuery)}` : '/api/users';
    this.http.get<User[]>(url).subscribe({
      next: data => this.users.set(data),
      error: err => console.error('Failed to load users:', err),
    });
  }

  public loadRoles(): void {
    this.http.get<Role[]>('/api/users/roles').subscribe({
      next: data => this.availableRoles.set(data),
      error: err => console.error('Failed to load roles:', err),
    });
  }

  public openCreateUserModal(): void {
    this.editingUserId.set(null);
    this.formUser = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      isActive: true,
      roleIds: this.availableRoles().map(r => r.id),
    };
    this.showUserModal.set(true);
  }

  public openEditUserModal(user: User): void {
    this.editingUserId.set(user.id);
    this.formUser = {
      username: user.username,
      password: '',
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      roleIds: user.roles.map(r => r.id),
    };
    this.showUserModal.set(true);
  }

  public closeUserModal(): void {
    this.showUserModal.set(false);
  }

  public isRoleSelectedForUser(roleId: number): boolean {
    return this.formUser.roleIds.includes(roleId);
  }

  public toggleUserRoleSelection(roleId: number, checked: boolean): void {
    if (checked) {
      if (!this.formUser.roleIds.includes(roleId)) {
        this.formUser.roleIds.push(roleId);
      }
    } else {
      this.formUser.roleIds = this.formUser.roleIds.filter(id => id !== roleId);
    }
  }

  public saveUser(): void {
    const id = this.editingUserId();
    if (id) {
      const updateDto: UpdateUserDto = {
        email: this.formUser.email,
        firstName: this.formUser.firstName,
        lastName: this.formUser.lastName,
        isActive: this.formUser.isActive,
        password: this.formUser.password || undefined,
        roleIds: this.formUser.roleIds,
      };
      this.http.put<User>(`/api/users/${id}`, updateDto).subscribe({
        next: () => {
          this.closeUserModal();
          this.loadUsers();
        },
        error: err => console.error('Failed to update user:', err),
      });
    } else {
      this.http.post<User>('/api/users', this.formUser).subscribe({
        next: () => {
          this.closeUserModal();
          this.loadUsers();
        },
        error: err => console.error('Failed to create user:', err),
      });
    }
  }

  public toggleActive(user: User): void {
    this.http.post<User>(`/api/users/${user.id}/toggle-active`, {}).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error('Failed to toggle active status:', err),
    });
  }
}
