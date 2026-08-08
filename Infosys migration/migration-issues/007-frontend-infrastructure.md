# Migration Issue: Angular Frontend Infrastructure Setup

**Priority:** Critical
**Estimated Effort:** 5-8 story points (1-2 sprints)
**Dependencies:** #002 (Authentication API)

## Description

Set up Angular application infrastructure including project structure, routing, authentication, state management, and shared components.

## Target Implementation

### Project Setup

```bash
ng new infosys-frontend --routing --style=scss
cd infosys-frontend
ng add @angular/material
```

### Project Structure

```
/src/app
  /core
    /auth
      - auth.service.ts
      - auth.guard.ts
      - token.interceptor.ts
      - auth.models.ts
    /services
      - api.service.ts
      - error-handler.service.ts
      - notification.service.ts
    /interceptors
      - http-error.interceptor.ts
      - loading.interceptor.ts
    /models
      - (shared models)
  
  /shared
    /components
      - header/
      - footer/
      - sidebar/
      - loading-spinner/
      - confirmation-dialog/
      - data-table/
    /directives
    /pipes
      - date-format.pipe.ts
      - currency-format.pipe.ts
    /validators
  
  /features
    - (feature modules)
  
  /layouts
    - main-layout/
    - auth-layout/
```

### Core Services

**Authentication Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Implementation
  }

  logout(): void {
    // Implementation
  }

  refreshToken(): Observable<any> {
    // Implementation
  }
}
```

**API Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
```

### HTTP Interceptors

**Token Interceptor:**
```typescript
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
```

### Routing

```typescript
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'deltager',
        loadChildren: () => import('./features/participants/participants.module')
          .then(m => m.ParticipantsModule)
      },
      {
        path: 'aktivitet',
        loadChildren: () => import('./features/activities/activities.module')
          .then(m => m.ActivitiesModule)
      },
      // ... other feature modules
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
```

### Environment Configuration

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  features: {
    enableMockData: false
  }
};
```

### Shared Components

Create reusable components:
- Loading spinner
- Confirmation dialog
- Data table with sorting/pagination
- Form components
- Error display

### Material Design Setup

Configure Angular Material theme:
```scss
@import '~@angular/material/theming';
@include mat-core();

$primary: mat-palette($mat-indigo);
$accent: mat-palette($mat-pink, A200, A100, A400);
$warn: mat-palette($mat-red);

$theme: mat-light-theme($primary, $accent, $warn);
@include angular-material-theme($theme);
```

## Tasks

- [ ] Create Angular project with Angular CLI
- [ ] Set up project structure
- [ ] Install dependencies (Material, etc.)
- [ ] Implement authentication service
- [ ] Implement HTTP interceptors
- [ ] Set up routing with guards
- [ ] Create shared components
- [ ] Configure environments
- [ ] Set up state management (if using NgRx)
- [ ] Implement error handling
- [ ] Set up notification system
- [ ] Configure Material theme
- [ ] Set up i18n/l10n
- [ ] Create build/deploy scripts
- [ ] Set up unit testing infrastructure
- [ ] Set up E2E testing infrastructure

## Acceptance Criteria

- [ ] Angular app bootstraps successfully
- [ ] Authentication flow working
- [ ] Routing configured with guards
- [ ] API calls working via interceptors
- [ ] Shared components created and documented
- [ ] Material design configured
- [ ] Error handling functional
- [ ] Loading states working
- [ ] Build process configured
- [ ] Tests running
- [ ] Documentation complete

## Technical Notes

- Use Angular 16+ for latest features
- Consider standalone components for better tree-shaking
- Implement proper TypeScript strict mode
- Use RxJS best practices
- Follow Angular style guide
- Set up ESLint and Prettier

## Labels

`frontend`, `angular`, `critical`, `infrastructure`, `setup`
