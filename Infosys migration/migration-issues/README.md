# Migration Issues

This directory contains individual issue templates for migrating the Infosys PHP application to .NET + Angular.

## Issue Organization

Issues are numbered and named by feature area. Each issue is a markdown file that can be:
1. Copied to the new monorepo as a GitHub issue
2. Used as a planning document
3. Converted to work items in project management tools

## Using These Issues

### Create GitHub Issues

For each file:
1. Copy the content
2. Create a new issue in the target repository
3. Apply the suggested labels
4. Assign to appropriate team members
5. Add to project board

### Estimation

Estimates are provided in story points:
- 1-3 points: Small task, 1-3 days
- 5-8 points: Medium task, 1-2 weeks
- 8-13 points: Large task, 2-3 weeks
- 13+ points: Should be broken down

### Priority Levels

- **Critical**: Must be done first, blocks other work
- **High**: Core functionality, high business value
- **Medium**: Important but not blocking
- **Low**: Nice to have, can be deferred

## Issue List

### Phase 1: Foundation (Critical)
1. **001-participant-api.md** - Participant/Attendee API (HIGH, 8-13 pts)
2. **002-authentication.md** - Authentication & Authorization (CRITICAL, 5-8 pts)
3. **003-activity-api.md** - Activity & Schedule Management API (HIGH, 8-13 pts)
4. **004-database-setup.md** - Database Schema & EF Setup (CRITICAL, 5-8 pts)
5. **005-payment-integration.md** - Payment Integration (HIGH, 5-8 pts)

### Phase 2: Core Features
6. **006-gds-api.md** - GDS Shift Management API (HIGH, 8-13 pts)
7. **007-frontend-infrastructure.md** - Angular Frontend Setup (CRITICAL, 5-8 pts)
8. **012-signup-module-api.md** - Signup Module & Public API (MEDIUM-HIGH, 8-13 pts)

### Phase 3: Supporting Features
9. **008-shop-economy-api.md** - Shop & Economy Management API (MEDIUM, 5-8 pts)
10. **009-resources-api.md** - Resources API (Food, Wear, Entrance, Rooms) (MEDIUM, 8-13 pts)
11. **010-boardgames-loans-api.md** - Boardgames & Loans API (LOW-MEDIUM, 5-8 pts)
12. **011-communication-systems.md** - Newsletter, Tickets, SMS, Email (MEDIUM, 8-13 pts)

### Additional Issues to Create

Additional work items should be created for:
- Photo management API
- Translation system API
- Admin tools and reporting
- Graph/statistics API
- Log viewing interface
- ID template/badge designer
- Barcode generation service
- PDF generation service
- Excel import/export utilities
- Data migration scripts
- Testing infrastructure setup
- CI/CD pipeline configuration
- Deployment strategy and infrastructure
- Performance optimization
- Security hardening
- Documentation
- Training materials

## Dependencies

Many issues depend on:
- #002 (Authentication) - Almost everything needs auth
- #004 (Database Setup) - Required for all data operations
- #001 (Participant API) - Core feature that others relate to

Review dependency chains before starting work.

## Suggested Work Order

### Phase 1: Foundation (Sprints 1-2)
1. Database setup (#004)
2. Authentication (#002)

### Phase 2: Core Backend Features (Sprints 3-6)
3. Participant API (#001)
4. Activity API (#003)
5. Payment integration (#005)
6. GDS system (#006)

### Phase 3: Frontend Infrastructure (Sprint 7-8)
7. Angular setup (#007)
8. Core components and routing
9. Authentication UI

### Phase 4: Public & Supporting Features (Sprints 9-12)
10. Signup module (#012)
11. Shop/economy (#008)
12. Resources management (#009)
13. Communication systems (#011)

### Phase 5: Secondary Features (Sprints 13-15)
14. Boardgames library (#010)
15. Loans system (#010)
16. Additional admin tools

### Phase 6: Polish & Launch (Sprints 16-18)
17. Testing and QA
18. Performance optimization
19. Documentation
20. Deployment and cutover

## Notes

- Estimates are rough and should be refined during sprint planning
- Some issues may need to be split into smaller tasks
- Technical debt and refactoring time should be accounted for
- Testing time is included in estimates
- Documentation time is included in estimates

