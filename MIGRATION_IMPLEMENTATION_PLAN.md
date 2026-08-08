# Infosys → Fastasys Migration: Single Master Implementation Plan

> [!IMPORTANT]
> **Instructions for AI Agents & Developers:**
> This document is the **single source of truth** for the Infosys PHP → Fastasys (.NET + Angular) migration.
>
> - **DO NOT** introduce new third-party dependencies (NuGet packages or npm libraries) without explicit permission from the user. Use built-in ASP.NET Core, Entity Framework Core, RxJS, and Angular standalone features.
> - **DO NOT** declare inline TypeScript interfaces inside feature component files. All types must be placed in `frontend/src/app/shared/types/<feature>.types.ts`.
> - **DO NOT** write duplicate UI building blocks across components. Reusable components (cards, badges, buttons, inputs) must be built as standalone atomic components in `frontend/src/app/shared/components/`.

---

## 🏗️ System Architecture & Conventions

### Stack Specifications

- **Backend:** ASP.NET Core 10 Web API (`Fastasys.ApiService`)
- **ORM & Database:** Entity Framework Core with In-Memory DB & MySQL mapping (`InfosysDbContext`)
- **Frontend:** Angular 20 standalone components (`frontend`)
- **Testing:** xUnit (`Fastasys.Tests`) for C#, Vitest & Angular ESLint for TypeScript

### Mandatory Architectural Rules

1. **Shared Types Location:** `frontend/src/app/shared/types/`
   - `activities.types.ts`
   - `participants.types.ts`
   - `hero-force.types.ts`
   - `shop.types.ts`
   - `resources.types.ts`
   - `boardgames.types.ts`
   - `communications.types.ts`
   - `signup.types.ts`
   - `auth.types.ts`

2. **Atomic Design System Components:** `frontend/src/app/shared/components/`
   - `Card` (`@shared/components/card/card`): Card container for headers, content projection, and hover states.
   - `Badge` (`@shared/components/badge/badge`): Status tag supporting `primary`, `success`, `warning`, `danger`, `neutral` variants.
   - `Button` (`@shared/components/button/button`): Angular Material button wrapper.

3. **No Unapproved External Dependencies Policy:**
   - All backend functionality (JWT, hashing, notifications, seeding, EAN-8 barcode generation) must use standard .NET libraries (`System.Security.Cryptography`, `System.Text.Json`, `BCrypt.Net-Next`, EF Core).
   - All frontend functionality must use standard Angular modules, RxJS, and Angular Material.

---

## 📋 Comprehensive 12-Issue Migration Matrix

| Issue ID | Feature Module | Scope & Requirements | Backend Implementation | Frontend Implementation |
| --- | --- | --- | --- | --- |
| **#001** | Participant Management | CRUD, check-in, search, schedule retrieval, barcode generation | `ParticipantsController.cs` (`GET`, `POST`, `PUT`, `/checkin`, `/barcode`, `/schedule`) | `ParticipantsComponent` (`participants.component.ts`), `@shared/types/participants.types` |
| **#002** | Authentication & Authz | User login, JWT generation, password verification with legacy MD5 upgrade to BCrypt | `AuthController.cs`, `AuthService.cs`, `User` entity | `LoginComponent`, `AuthService`, `auth.guard.ts`, `auth.interceptor.ts`, `@shared/types/auth.types` |
| **#003** | Activity & Events API | Game management, GM info, search, categories, min/max players, duration | `ActivitiesController.cs` (`GET`, `POST`, `PUT`, `DELETE`), `Activity` entity | `ActivitiesComponent` (`activities.component.ts`), `@shared/types/activities.types` |
| **#004** | Database Setup | EF Core models, DB Context, relationships, composite keys, seeder data | `InfosysDbContext.cs`, 10 entity files in `Data/Entities/`, `DbSeeder.cs` | DB Context configuration & In-Memory / MySQL provider setup |
| **#005** | Payment Integration | Payment creation, transaction tracking, status query, webhook callbacks | `PaymentsController.cs`, `MockPaymentService.cs`, `Payment` entity | Payment DTOs & mock gateway callback handling |
| **#006** | Hero Force Shift Management | Volunteer shifts, category overview, max participants, shift signups | `HeroForceController.cs` (`GET /shifts`, `POST /{id}/signup`, `GET /my-shifts`), `HeroForceShift` entity | `HeroForceComponent` (`hero-force.component.ts`), `@shared/types/hero-force.types` |
| **#007** | Frontend Infrastructure | Angular 20 SPA monorepo, standalone components, router, atomic design | `app.routes.ts`, `app.ts`, `styles.scss`, Vitest setup | Navigation toolbar, responsive layout grid, atomic component system |
| **#008** | Shop & Economy | Product catalog, inventory stock tracking, order creation, sales log | `ShopController.cs` (`GET /products`, `POST /products`, `POST /orders`, `GET /sales`), `Product`, `Sale` entities | `ShopComponent` (`shop.component.ts`), `@shared/types/shop.types` |
| **#009** | Resources Management | Catering/Food types, Wear items stock/sizes, Venue room roster & reservations | `FoodController`, `WearController`, `RoomsController` (`GET`, `POST /order`, `POST /rooms`) | `ResourcesComponent` (`resources.component.ts`), `@shared/types/resources.types` |
| **#010** | Boardgames & Loans | Game library search, availability check, loan checkout, return tracking | `BoardgamesController.cs` (`GET`, `GET /loans`, `POST /{id}/checkout`, `POST /{id}/return`) | `BoardgamesComponent` (`boardgames.component.ts`), `@shared/types/boardgames.types` |
| **#011** | Communications | Ticket submission, reply threads, broadcast newsletters, Email/SMS notifications | `NewslettersController`, `TicketsController`, `NotificationsController`, `MockNotificationService` | `CommunicationsComponent` (`communications.component.ts`), `@shared/types/communications.types` |
| **#012** | Signup Module | Multi-step signup wizard, dynamic page elements, public submission & confirmation | `SignupController.cs` (`GET /pages`, `POST /submit`), `SignupSubmission` entity | `SignupComponent` (`signup.component.ts`), `@shared/types/signup.types` |

---

## 🗺️ Complete Step-by-Step Implementation Steps

Any developer or AI agent working on this codebase should follow these exact steps in order:

### Step 1: Define Shared Types (`frontend/src/app/shared/types/`) - [x] Completed

- [x] Create feature type files in `@shared/types/`:
  - `activities.types.ts`: `Activity`, `CreateActivityDto`, `ActivitySchedule`
  - `participants.types.ts`: `Participant`, `CreateParticipantDto`, `ParticipantScheduleItem`
  - `hero-force.types.ts`: `HeroForceShift`, `HeroForceCategory`
  - `shop.types.ts`: `Product`, `Sale`, `CreateOrderDto`
  - `resources.types.ts`: `FoodType`, `WearItem`, `Room`, `OrderFoodDto`, `OrderWearDto`
  - `boardgames.types.ts`: `Boardgame`, `BoardgameLoan`, `CheckoutBoardgameDto`
  - `communications.types.ts`: `Ticket`, `TicketMessage`, `Newsletter`, `SendEmailDto`, `SendSmsDto`
  - `signup.types.ts`: `SignupPage`, `SignupPageElement`, `SignupSubmission`
  - `auth.types.ts`: `User`, `LoginDto`, `AuthResponse`

### Step 2: Implement Atomic Design Components (`frontend/src/app/shared/components/`) - [x] Completed

- [x] Build reusable UI building blocks:
  - `Card` (`card.ts`): Reusable wrapper with title, subtitle, hover animation, and `<ng-content />`.
  - `Badge` (`badge.ts`): Tag atom for statuses and categories (`primary`, `success`, `warning`, `danger`, `neutral`).
  - `Button` (`button.ts`): Angular Material button wrapper with icons.

### Step 3: Configure Database Schemas & Seeder (`Fastasys.ApiService/Data/`) - [x] Completed

- [x] Define EF Core entities in `Data/Entities/`:
  - `User`, `Role`, `Privilege`, `UserRole`, `RolePrivilege`
  - `Participant`, `Activity`, `Schedule`, `ParticipantSchedule`
  - `Payment`, `HeroForceCategory`, `HeroForceShift`, `HeroForceShiftParticipant`
  - `Room`, `FoodType`, `ParticipantFood`, `WearItem`, `ParticipantWear`, `EntranceType`
  - `Product`, `Sale`
  - `Boardgame`, `BoardgameLoan`, `LoanItem`
  - `Newsletter`, `Ticket`, `TicketMessage`, `SmsLog`
  - `SignupPage`, `SignupPageElement`, `SignupConfig`, `SignupSubmission`
- [x] Configure `InfosysDbContext.cs` composite keys and relationships.
- [x] Fill `DbSeeder.cs` with seed data for all feature modules (idempotently seeding Admin user `admin` / `admin123`).

### Step 4: Implement Authentication & Legacy Password Upgrades (`Services/AuthService.cs`) - [x] Completed

- [x] Implement `AuthService.cs` with JWT generation (`GenerateJwtToken`).
- [x] Handle password verification: check BCrypt hash first; if match fails, check MD5 hash of input against stored hash. If MD5 matches, automatically rehash password using BCrypt (`BCrypt.Net.BCrypt.HashPassword`) and save to database.

### Step 5: Implement Participant Management API (`Controllers/ParticipantsController.cs`) - [x] Completed

- [x] `GET /api/participants?search={query}`: Filter by name, email, or barcode.
- [x] `GET /api/participants/{id}`: Participant detail.
- [x] `POST /api/participants`: Create participant with generated EAN-8 barcode.
- [x] `PUT /api/participants/{id}`: Update participant info.
- [x] `POST /api/participants/{id}/checkin`: Mark checked-in and set `CheckedInAt`.
- [x] `GET /api/participants/{id}/barcode`: Retrieve barcode string.
- [x] `GET /api/participants/{id}/schedule`: Retrieve combined activity and Hero Force shift schedule.

### Step 6: Implement Activity & Hero Force APIs (`Controllers/ActivitiesController.cs`, `HeroForceController.cs`) - [x] Completed

- [x] `ActivitiesController`: Full CRUD for convention activities with category filtering.
- [x] `HeroForceController`: List shifts, signup participant for shift (`POST /api/hero-force/shifts/{id}/signup`), view my shifts (`GET /api/hero-force/my-shifts`).

### Step 7: Implement Shop, Economy & Payment Gateways (`ShopController.cs`, `PaymentsController.cs`) - [x] Completed

- [x] `ShopController`:
  - `GET /api/shop/products`: Active product list.
  - `POST /api/shop/products`: Create product.
  - `POST /api/shop/orders`: Purchase product, decrease stock, log `Sale`.
  - `GET /api/shop/sales`: Sales audit log.
- [x] `PaymentsController`: Create payment requests, check payment status, receive gateway webhooks.

### Step 8: Implement Resources API (`Controllers/ResourcesControllers.cs`) - [x] Completed

- [x] `FoodController`: List food types (`GET /api/food/types`), order food (`POST /api/food/order`).
- [x] `WearController`: List wear items (`GET /api/wear/items`), order wear (`POST /api/wear/order`).
- [x] `RoomsController`: List rooms (`GET /api/rooms`), create room (`POST /api/rooms`).

### Step 9: Implement Boardgames & Loan System (`Controllers/BoardgamesController.cs`) - [x] Completed

- [x] `GET /api/boardgames?search={query}`: Search catalog by title, author, barcode.
- [x] `GET /api/boardgames/loans`: View all active and completed loans.
- [x] `POST /api/boardgames/{id}/checkout`: Check out boardgame to participant (sets `IsPresent = false`, creates `BoardgameLoan`).
- [x] `POST /api/boardgames/{id}/return`: Return boardgame (sets `IsPresent = true`, populates `ReturnedAt`).

### Step 10: Implement Communications & Notifications (`Controllers/CommunicationsControllers.cs`) - [x] Completed

- [x] `NewslettersController`: List newsletters (`GET`), publish newsletter broadcast (`POST /api/newsletters`).
- [x] `TicketsController`: List tickets (`GET`), create ticket (`POST /api/tickets`), reply to ticket (`POST /api/tickets/{id}/messages`).
- [x] `NotificationsController`: Send email (`POST /api/notifications/email`), send SMS (`POST /api/notifications/sms`), view dispatch logs.

### Step 11: Implement Frontend Feature Components (`frontend/src/app/features/`) - [x] Completed

- [x] Build Angular standalone components importing types from `@shared/types/*` and using `@shared/components/*`:
  - `ParticipantsComponent` (`participants.component.ts`)
  - `ActivitiesComponent` (`activities.component.ts`)
  - `HeroForceComponent` (`hero-force.component.ts`)
  - `ShopComponent` (`shop.component.ts`)
  - `ResourcesComponent` (`resources.component.ts`)
  - `BoardgamesComponent` (`boardgames.component.ts`)
  - `CommunicationsComponent` (`communications.component.ts`)
  - `SignupComponent` (`signup.component.ts`)
  - `LoginComponent` (`login.component.ts`)
- [x] Register routes in `app.routes.ts` and add toolbar links in `app.ts`.
- [x] Configure proxy settings in `proxy.conf.json` and Material Icons stylesheet links in `index.html`.

### Step 12: Comprehensive Frontend Component Unit Tests (`frontend/src/app/`) - [x] Completed

- [x] Add unit test specs for atomic components (`card.spec.ts`, `badge.spec.ts`).
- [x] Add unit test specs for feature components (`participants.component.spec.ts`).
- [x] Add unit test specs for auth guard (`auth.guard.spec.ts`) and interceptor (`token.interceptor.spec.ts`).

---

## 🧪 Verification & Quality Control Commands

Always run these verification commands to ensure 100% compliance and zero regressions:

### 1. Backend Verification (.NET)

```bash
# Must pass all xUnit tests with 0 failures
dotnet test
```

### 2. Frontend Verification (Angular ESLint & Vitest)

```bash
cd frontend

# Verify zero ESLint warnings or errors
npm run lint

# Run unit tests
npm test
```

---

## 📁 Key File Index

- **Master Plan:** [MIGRATION_IMPLEMENTATION_PLAN.md](file:///Users/mads/git/Fastaval/fastasys/MIGRATION_IMPLEMENTATION_PLAN.md)
- **Agent Rules:** [.agents/AGENTS.md](file:///Users/mads/git/Fastaval/fastasys/.agents/AGENTS.md)
- **Database Context:** [InfosysDbContext.cs](file:///Users/mads/git/Fastaval/fastasys/Fastasys.ApiService/Data/InfosysDbContext.cs)
- **Database Seeder:** [DbSeeder.cs](file:///Users/mads/git/Fastaval/fastasys/Fastasys.ApiService/Data/DbSeeder.cs)
- **Angular Routes:** [app.routes.ts](file:///Users/mads/git/Fastaval/fastasys/frontend/src/app/app.routes.ts)
- **Angular Main Component:** [app.ts](file:///Users/mads/git/Fastaval/fastasys/frontend/src/app/app.ts)
- **Legacy Issue Specs:** [Infosys migration/migration-issues/](file:///Users/mads/git/Fastaval/fastasys/Infosys%20migration/migration-issues/README.md)
