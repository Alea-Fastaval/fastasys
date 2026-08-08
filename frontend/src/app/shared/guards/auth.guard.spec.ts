import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '@shared/services';
import { describe, beforeEach, vi, it, expect } from 'vitest';

describe('authGuard', () => {
  let authService: { isAuthenticated: ReturnType<typeof signal<boolean>> };
  let router: Partial<Router>;

  beforeEach(() => {
    authService = {
      isAuthenticated: signal(false),
    };
    router = {
      parseUrl: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should allow access when user is authenticated', () => {
    authService.isAuthenticated.set(true);
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const dummyState = {} as RouterStateSnapshot;
    const result = TestBed.runInInjectionContext(() => authGuard(dummyRoute, dummyState));
    expect(result).toBe(true);
  });

  it('should redirect to /login when user is not authenticated', () => {
    authService.isAuthenticated.set(false);
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const dummyState = {} as RouterStateSnapshot;
    TestBed.runInInjectionContext(() => authGuard(dummyRoute, dummyState));
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });
});
