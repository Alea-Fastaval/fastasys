import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UsersComponent } from './users';
import { User, Role } from '@shared/types';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let httpMock: HttpTestingController;

  const mockRoles: Role[] = [
    { id: 1, name: 'Admin', description: 'Administrator', privileges: [] },
    { id: 2, name: 'Organizer', description: 'Event organizer', privileges: [] },
  ];

  const mockUsers: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@fastaval.dk',
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      createdAt: '2026-08-08T00:00:00Z',
      roles: [mockRoles[0]],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const handleInit = () => {
    fixture.detectChanges();
    httpMock.expectOne('/assets/i18n/en.json').flush({});
  };

  it('should load users and roles on initialization', () => {
    handleInit();

    const usersReq = httpMock.expectOne('/api/users');
    expect(usersReq.request.method).toBe('GET');
    usersReq.flush(mockUsers);

    const rolesReq = httpMock.expectOne('/api/users/roles');
    expect(rolesReq.request.method).toBe('GET');
    rolesReq.flush(mockRoles);

    expect(component.users().length).toBe(1);
    expect(component.users()[0].username).toBe('admin');
    expect(component.availableRoles().length).toBe(2);
  });

  it('should toggle active status for a user', () => {
    handleInit();
    httpMock.expectOne('/api/users').flush(mockUsers);
    httpMock.expectOne('/api/users/roles').flush(mockRoles);

    component.toggleActive(mockUsers[0]);

    const toggleReq = httpMock.expectOne('/api/users/1/toggle-active');
    expect(toggleReq.request.method).toBe('POST');
    toggleReq.flush({ ...mockUsers[0], isActive: false });

    // Expect reload
    const reloadReq = httpMock.expectOne('/api/users');
    expect(reloadReq.request.method).toBe('GET');
    reloadReq.flush([{ ...mockUsers[0], isActive: false }]);

    expect(component.users()[0].isActive).toBe(false);
  });
});
