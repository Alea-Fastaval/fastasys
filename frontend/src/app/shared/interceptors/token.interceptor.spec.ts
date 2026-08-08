import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tokenInterceptor } from './token.interceptor';
import { AuthService } from '../services/auth.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('tokenInterceptor', () => {
  let authServiceMock: { getToken: () => string | null };

  beforeEach(() => {
    authServiceMock = {
      getToken: () => null,
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });
  });

  it('should attach Authorization Bearer header when token exists', () => {
    authServiceMock.getToken = () => 'test-jwt-token';
    const req = new HttpRequest('GET', '/api/participants');
    const next: HttpHandlerFn = modifiedReq => {
      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer test-jwt-token');
      return of(new HttpResponse<unknown>({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => tokenInterceptor(req, next));
  });

  it('should pass original request when token is null', () => {
    authServiceMock.getToken = () => null;
    const req = new HttpRequest('GET', '/api/participants');
    const next: HttpHandlerFn = modifiedReq => {
      expect(modifiedReq.headers.has('Authorization')).toBe(false);
      return of(new HttpResponse<unknown>({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => tokenInterceptor(req, next));
  });
});
