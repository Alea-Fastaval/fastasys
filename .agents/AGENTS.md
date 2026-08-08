# Project Rules & Design Conventions

## Shared Types Conventions

- Place all TypeScript interfaces, DTOs, and type definitions in `frontend/src/app/shared/types/`.
- Group types into feature-based files, for example:
  - `shared/types/activities.types.ts`
  - `shared/types/participants.types.ts`
  - `shared/types/gds.types.ts`
  - `shared/types/shop.types.ts`
  - `shared/types/resources.types.ts`
  - `shared/types/boardgames.types.ts`
  - `shared/types/communications.types.ts`
  - `shared/types/signup.types.ts`
- Feature components must import types from `shared/types/` instead of declaring inline types/interfaces.

## Atomic Design System Conventions

- Implement UI building blocks (buttons, inputs, cards, badges, chips, etc.) as standalone reusable atomic components in `frontend/src/app/shared/components/`.
- Ensure components throughout the app consume these shared atomic design components for visual consistency across the entire application.

## Command Approval & Execution Rules

- When proposing terminal commands or discussing tool execution approvals with the user, always recommend approving the exact command being executed.
- Never suggest or encourage broad wildcard matching or executable-wide auto-approvals (e.g. allowing all `dotnet` commands when running `dotnet test`).

