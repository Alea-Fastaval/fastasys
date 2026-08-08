import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RolesComponent } from './roles';
import { Role, Privilege } from '@shared/types';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let httpMock: HttpTestingController;

  const mockPrivileges: Privilege[] = [
    { id: 1, name: 'View Users', key: 'users_view' },
    { id: 2, name: 'Edit/Create Users', key: 'users_edit' },
  ];

  const mockRoles: Role[] = [
    { id: 1, name: 'Admin', description: 'Administrator', privileges: mockPrivileges },
    { id: 2, name: 'Organizer', description: 'Event organizer', privileges: [mockPrivileges[0]] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
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

  it('should load roles and privileges on initialization', () => {
    handleInit();

    const rolesReq = httpMock.expectOne('/api/users/roles');
    expect(rolesReq.request.method).toBe('GET');
    rolesReq.flush(mockRoles);

    const privsReq = httpMock.expectOne('/api/users/privileges');
    expect(privsReq.request.method).toBe('GET');
    privsReq.flush(mockPrivileges);

    expect(component.availableRoles().length).toBe(2);
    expect(component.allPrivileges().length).toBe(2);
    expect(component.selectedRole()?.name).toBe('Admin');
  });

  it('should select a role', () => {
    handleInit();
    httpMock.expectOne('/api/users/roles').flush(mockRoles);
    httpMock.expectOne('/api/users/privileges').flush(mockPrivileges);

    component.selectRole(mockRoles[1]);
    expect(component.selectedRole()?.name).toBe('Organizer');
  });
});
