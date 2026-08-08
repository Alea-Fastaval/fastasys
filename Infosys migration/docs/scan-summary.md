# Migration Scan Summary

**Generated:** 2025-11-07 15:38:24
**Project:** Infosys (Fastaval Convention Management System)
**Current Stack:** PHP 8.0 + MySQL + Custom MVC Framework
**Target Stack:** .NET (ASP.NET Core) + Angular + MySQL

## Executive Summary

This document provides a high-level summary of the existing PHP-based Infosys system to support migration to a .NET + Angular monorepo architecture.

### System Overview

Infosys is a comprehensive role-playing convention management system currently built with:
- **Backend**: Custom PHP 8.0 MVC framework
- **Database**: MySQL 5.5/5.7
- **Frontend**: Server-rendered PHP templates (phtml) with jQuery
- **Architecture**: Monolithic MVC pattern with custom routing

### Key Metrics

| Metric | Count |
|--------|-------|
| Controllers | 26 |
| Defined Routes | 318 |
| Templates | 192 |
| Template Categories | 26 |
| Models/Entities | (see models/ and entities/ directories) |

### Core Functionality Areas

Based on the route and controller analysis, the system manages:

1. **Participant Management** (deltager/participant)
   - Registration, check-in, payment
   - Profile management
   - Activity/game scheduling
   - Badge/ID generation (EAN8 barcodes)
   - SMS notifications
   - Email communications

2. **Activity & Schedule Management** (aktivitet/activity)
   - Activity creation and editing
   - Schedule assignment
   - GM (Game Master) management
   - Signup tracking

3. **GDS (Game/Event Shift Management)** (gds)
   - Shift scheduling
   - Category management
   - Calendar views

4. **Shop & Economy**
   - Product management
   - Sales tracking
   - Statistics and graphs

5. **Food & Catering** (mad/food)
   - Food type management
   - Order tracking
   - Reporting

6. **Entrance & Access Control**
   - Entrance types
   - Entry tracking

7. **Wear (Merchandise/Uniforms)**
   - Item management
   - Size tracking
   - Distribution

8. **Rooms & Facilities**
   - Room management
   - Booking system

9. **Photo Management**
   - Photo upload and organization

10. **Admin & User Management**
    - User accounts
    - Role-based access control
    - Privileges management

11. **Newsletter System**
    - Newsletter creation
    - Subscription management

12. **Ticketing System**
    - Support tickets
    - Message threads
    - Subscriptions

13. **Translations**
    - Multi-language support
    - Label management

14. **Boardgame Lending Library**
    - Game catalog
    - Loan tracking
    - Presence checking
    - Rankings

15. **General Item Loans**
    - Equipment lending
    - Tracking system

16. **Signup Module** (separate signup flow)
    - Configurable pages
    - Dynamic form elements
    - API for external signup

17. **API Endpoints**
    - Mobile app support
    - External integrations
    - RESTful-style endpoints

18. **Payment Integration**
    - Payment gateway (fritid.dk)
    - Transaction callbacks
    - Payment status tracking

## Architecture Patterns

### Routing
- Custom routing system defined in `include/framework/routes.php`
- Pattern: `$this->routes['name'] = ['url' => '...', 'controller' => '...', 'method' => '...']`
- URL parameters marked with `:param:` syntax
- 318 explicitly defined routes

### Controllers
- Base controller class in `include/framework/controller.php`
- 26 specialized controllers extending base
- Convention: method names like `main()`, `ajaxMethod()`, `updateX()`, `visX()` (vis = show in Danish)

### Models
- Base model in `include/framework/model.php`
- DBObject pattern for ORM-like functionality
- Located in `include/models/`

### Templates
- PHP templates (.phtml files)
- Organized by controller/feature area
- 26 template directories matching functional areas
- Server-side rendering with embedded PHP

### Frontend JavaScript
- jQuery-based
- Custom scripts in `public/js/`
- Some admin functions and specialized features
- DataTables for tabular data

### Database Access
- Custom DB abstraction in `include/framework/db.php`
- DBObject base class for entities
- Manual query construction
- Migration system in place

## API Endpoints

The system has a robust API layer (see `api_controller.php`) with endpoints for:
- Activity/schedule data
- Participant information
- GDS shifts
- Food/entrance/wear data
- Mobile app registration
- Boardgame data
- User authentication

Many endpoints are versioned (v2, v3) indicating evolution over time.

## Authentication & Authorization

- Session-based authentication
- Role-based access control
- Privileges system
- Password reset functionality via hashed links
- Special participant-facing authentication via hash links

## Data Entities

Key entities identified:
- Deltager (Participant)
- Aktivitet (Activity)
- Afvikling (Schedule/Event Instance)
- Hold (Group)
- GDS Shifts
- Food, Wear, Entrance types
- Mad (Meal types)
- Værelse (Room)
- Boardgames
- Loans
- Messages/Newsletters

## Integration Points

- **SMS**: SMS gateway integration for notifications
- **Email**: SMTP mail sending for various notifications
- **Payment**: Payment provider (fritid.dk) integration
- **Barcode**: EAN8 barcode generation for participant badges
- **PDF**: PDF generation (mpdf library)
- **Excel**: Spreadsheet import/export (PhpSpreadsheet)
- **Firebase**: Push notification support

## Migration Considerations

### Complexity Areas

1. **Custom Framework**: Entire custom MVC framework needs reimplementation in .NET
2. **Route Mapping**: 318 routes need careful mapping to ASP.NET Core routing
3. **Business Logic**: Significant logic in controllers needs extraction to services
4. **Database Schema**: Existing MySQL schema preserved, but ORM (Entity Framework) mapping needed
5. **Danish Language**: Many Danish terms in code and UI
6. **Legacy Patterns**: Some older PHP patterns may need modernization

### Recommended Approach

1. **Phase 1**: API-first migration
   - Migrate API controller endpoints to .NET Web API
   - Create DTOs and service layer
   - Set up Entity Framework models

2. **Phase 2**: Core backend features
   - Participant management
   - Activity/schedule system
   - Authentication/authorization

3. **Phase 3**: Frontend rewrite in Angular
   - Create Angular components for each functional area
   - Implement routing
   - Connect to new API

4. **Phase 4**: Secondary features
   - Shop, boardgames, loans
   - Ticketing system
   - Newsletter

5. **Phase 5**: Integration and cleanup
   - Payment integration
   - Email/SMS services
   - Admin tools

### Risk Factors

- **Data Migration**: Need to ensure zero data loss during transition
- **Session/Auth**: Different session management between PHP and .NET
- **Partial Migration**: Supporting both systems during transition
- **Testing**: Comprehensive testing needed due to complexity
- **Domain Knowledge**: Danish context and convention-specific workflows

## Next Steps

1. Review detailed endpoint documentation in `docs/api-endpoints.md`
2. Review frontend pages documentation in `docs/frontend-pages.md`
3. Review individual migration issues in `migration-issues/` directory
4. Set up target .NET monorepo structure
5. Begin with API endpoint migration
6. Implement Entity Framework models based on existing schema

## Files Generated

- `docs/scan-summary.md` (this file) - High-level overview
- `docs/api-endpoints.md` - Complete API endpoint catalog
- `docs/frontend-pages.md` - Frontend pages and views catalog
- `artifacts/regex-results.txt` - Raw pattern matching results
- `migration-issues/*.md` - Individual issue templates for migration tasks
