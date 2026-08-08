# Frontend Pages & Views Documentation

**Generated:** 2025-11-07 15:40:29
**Template Areas:** 25
**Total Templates:** 192
**JavaScript Files:** 77

This document catalogs all frontend pages, views, and user interfaces in the Infosys system.

## Overview

The current frontend architecture consists of:
- **Server-rendered PHP templates** (.phtml files) organized by functional area
- **jQuery-based JavaScript** for dynamic interactions
- **DataTables** for tabular data display
- **Lightbox** for image viewing
- **Custom JavaScript modules** for specific features

## Template Organization

Templates are organized in subdirectories under `include/templates/` by functional area. Each controller typically has a corresponding template directory.

### Activity (25 templates)

**Purpose:** Activity and game management - creation, editing, scheduling, assignments

**Templates:**

- `confirmdelete.phtml` - Confirmdelete view
- `confirmdeleteafvikling.phtml` - Confirmdeleteafvikling view
- `confirmvote.phtml` - Confirmvote view
- `editafvikling.phtml` - Editafvikling view
- `editaktivitet.phtml` - Editaktivitet view
- `gameactivity.phtml` - Gameactivity view
- `gamestartdetails.phtml` - Gamestartdetails view
- `gamestartmaster.phtml` - Gamestartmaster view
- `gamestartminion.phtml` - Gamestartminion view
- `gamestartqueue.phtml` - Gamestartqueue view
- `gettotalplaytime.phtml` - Gettotalplaytime view
- `importexportactivities.phtml` - Importexportactivities view
- `main.phtml` - Main view
- `noresults.phtml` - Noresults view
- `novoteregeneration.phtml` - Novoteregeneration view
- `opretaktivitet.phtml` - Opretaktivitet view
- `prepareschedulevotes.phtml` - Prepareschedulevotes view
- `showprioritysignupstatistics.phtml` - Showprioritysignupstatistics view
- `showvotesboard.phtml` - Showvotesboard view
- `showvotesrole.phtml` - Showvotesrole view
- `specifyvote.phtml` - Specifyvote view
- `visaktivitet.phtml` - Visaktivitet view
- `visalle.phtml` - Visalle view
- `votingballots.phtml` - Votingballots view
- `votingdone.phtml` - Votingdone view


### Admin (5 templates)

**Purpose:** System administration - users, roles, privileges, configuration

**Templates:**

- `handleprivileges.phtml` - Handleprivileges view
- `handleroles.phtml` - Handleroles view
- `handleusers.phtml` - Handleusers view
- `main.phtml` - Main view
- `showconfirmreset.phtml` - Showconfirmreset view


### Api (3 templates)

**Purpose:** API response templates (JSON templates)

**Templates:**

- `confirmationdata.phtml` - Confirmationdata view
- `confirmationdataen.phtml` - Confirmationdataen view
- `fetchgraphdata.phtml` - Fetchgraphdata view


### Boardgames (2 templates)

**Purpose:** Board game library - catalog, loans, presence checking

**Templates:**

- `overview.phtml` - Overview view
- `showreporting.phtml` - Showreporting view


### Economy (4 templates)

**Purpose:** Financial reporting and economy tracking

**Templates:**

- `accountingoverview.phtml` - Accountingoverview view
- `detailedbudget.phtml` - Detailedbudget view
- `participantoverview.phtml` - Participantoverview view
- `registerpayments.phtml` - Registerpayments view


### Entrance (7 templates)

**Purpose:** Entrance type management and tracking

**Templates:**

- `displaydelete.phtml` - Displaydelete view
- `editentry.phtml` - Editentry view
- `entrystats.phtml` - Entrystats view
- `entrytypes.phtml` - Entrytypes view
- `main.phtml` - Main view
- `noresults.phtml` - Noresults view
- `showtype.phtml` - Showtype view


### Food (9 templates)

**Purpose:** Food and catering management - meal types, orders, reporting

**Templates:**

- `displaydelete.phtml` - Displaydelete view
- `displayhandout.phtml` - Displayhandout view
- `editfood.phtml` - Editfood view
- `foodstats.phtml` - Foodstats view
- `main.phtml` - Main view
- `noresults.phtml` - Noresults view
- `showfood.phtml` - Showfood view
- `showtradeable.phtml` - Showtradeable view
- `showtypes.phtml` - Showtypes view


### Gds (4 templates)

**Purpose:** GDS (shift) management - calendar view, shift creation/editing, category management

**Templates:**

- `calendar.phtml` - Calendar view
- `categories.phtml` - Categories view
- `editcategory.phtml` - Editcategory view
- `listshifts.phtml` - Listshifts view


### Generic (2 templates)

**Purpose:** Reusable generic components

**Templates:**

- `json.phtml` - Json view
- `notfound.phtml` - Notfound view


### Groups (7 templates)

**Purpose:** Group management

**Templates:**

- `confirmdelete.phtml` - Confirmdelete view
- `creategroup.phtml` - Creategroup view
- `edithold.phtml` - Edithold view
- `main.phtml` - Main view
- `noresults.phtml` - Noresults view
- `showgroup.phtml` - Showgroup view
- `visalle.phtml` - Visalle view


### Idtemplate (2 templates)

**Purpose:** ID badge template designer

**Templates:**

- `renderidcards.phtml` - Renderidcards view
- `showedit.phtml` - Showedit view


### Index (8 templates)

**Purpose:** Main/home pages, login, general layouts

**Templates:**

- `forgottenpassdialog.phtml` - Forgottenpassdialog view
- `login.phtml` - Login view
- `logout.phtml` - Logout view
- `main.phtml` - Main view
- `noaccess.phtml` - Noaccess view
- `passwordresetemail.phtml` - Passwordresetemail view
- `resetpassdialog.phtml` - Resetpassdialog view
- `systemlocked.phtml` - Systemlocked view


### Loans (1 templates)

**Purpose:** General equipment lending system

**Templates:**

- `overview.phtml` - Overview view


### Log (1 templates)

**Purpose:** System logs and activity tracking

**Templates:**

- `showlog.phtml` - Showlog view


### Mail (8 templates)

**Purpose:** Email management templates

**Templates:**

- `evaluation_mail_da.phtml` - Evaluation Mail Da view
- `evaluation_mail_en.phtml` - Evaluation Mail En view
- `fixpass_mail_da.phtml` - Fixpass Mail Da view
- `fixpass_mail_en.phtml` - Fixpass Mail En view
- `payment_confirm_mail_da.phtml` - Payment Confirm Mail Da view
- `payment_confirm_mail_en.phtml` - Payment Confirm Mail En view
- `setup_mail_da.phtml` - Setup Mail Da view
- `setup_mail_en.phtml` - Setup Mail En view


### Newsletter (9 templates)

**Purpose:** Newsletter system - creation, viewing, subscriptions

**Templates:**

- `confirm.phtml` - Confirm view
- `create.phtml` - Create view
- `edit.phtml` - Edit view
- `main.phtml` - Main view
- `subscribe.phtml` - Subscribe view
- `subscribers.phtml` - Subscribers view
- `unsubscribe.phtml` - Unsubscribe view
- `view.phtml` - View view
- `viewall.phtml` - Viewall view


### Participant (64 templates)

**Purpose:** Participant/attendee management interface - registration, profiles, check-in, payments

**Templates:**

- `anonymizeparticipants.phtml` - Anonymizeparticipants view
- `checkfordoublebookings.phtml` - Checkfordoublebookings view
- `checkin.phtml` - Checkin view
- `confirmdelete.phtml` - Confirmdelete view
- `createandcheckin.phtml` - Createandcheckin view
- `detailedbudget.phtml` - Detailedbudget view
- `displaycharactersheet.phtml` - Displaycharactersheet view
- `displayeconomy.phtml` - Displayeconomy view
- `displayemaillist.phtml` - Displayemaillist view
- `displayparticipantinfo.phtml` - Displayparticipantinfo view
- `displaysearch.phtml` - Displaysearch view
- `displaysmsdialog.phtml` - Displaysmsdialog view
- `downloadspreadsheet.phtml` - Downloadspreadsheet view
- `editaktiviteter.phtml` - Editaktiviteter view
- `editaktivitettilmeldinger.phtml` - Editaktivitettilmeldinger view
- `editgds.phtml` - Editgds view
- `editgdstilmeldinger.phtml` - Editgdstilmeldinger view
- `edittypes.phtml` - Edittypes view
- `external.phtml` - External view
- `external_en.phtml` - External En view
- `external_pass.phtml` - External Pass view
- `external_pass_en.phtml` - External Pass En view
- `finalpaymentreminder-da.phtml` - Finalpaymentreminder Da view
- `finalpaymentreminder-en.phtml` - Finalpaymentreminder En view
- `karmalist.phtml` - Karmalist view
- `karmastatus.phtml` - Karmastatus view
- `listgms.phtml` - Listgms view
- `main.phtml` - Main view
- `nametaglist.phtml` - Nametaglist view
- `noresults.phtml` - Noresults view
- `participant_macros.phtml` - Participant Macros view
- `payment.phtml` - Payment view
- `paymentreminderannulled-da.phtml` - Paymentreminderannulled Da view
- `paymentreminderannulled-en.phtml` - Paymentreminderannulled En view
- `paymentreminderlate-da.phtml` - Paymentreminderlate Da view
- `paymentreminderlate-en.phtml` - Paymentreminderlate En view
- `paymentreminderregular-da.phtml` - Paymentreminderregular Da view
- `paymentreminderregular-en.phtml` - Paymentreminderregular En view
- `processpayment.phtml` - Processpayment view
- `registermobilepay.phtml` - Registermobilepay view
- `resetparticipantpassword.phtml` - Resetparticipantpassword view
- `reviewda.phtml` - Reviewda view
- `reviewen.phtml` - Reviewen view
- `secondpaymentreminder-da.phtml` - Secondpaymentreminder Da view
- `secondpaymentreminder-en.phtml` - Secondpaymentreminder En view
- `sendpasswordemailda.phtml` - Sendpasswordemailda view
- `sendpasswordemailen.phtml` - Sendpasswordemailen view
- `sendsignupemail.phtml` - Sendsignupemail view
- `sendsignupemailen.phtml` - Sendsignupemailen view
- `showmissingpayment.phtml` - Showmissingpayment view
- `showpaymentdone.phtml` - Showpaymentdone view
- `showrefund.phtml` - Showrefund view
- `updateparticipantsleeping.phtml` - Updateparticipantsleeping view
- `visalle.phtml` - Visalle view
- `visdeltager.phtml` - Visdeltager view
- `visedit.phtml` - Visedit view
- `viseditmadwear.phtml` - Viseditmadwear view
- `vislist.phtml` - Vislist view
- `visopret.phtml` - Visopret view
- `vistextedit.phtml` - Vistextedit view
- `welcomemail2da.phtml` - Welcomemail2da view
- `welcomemail2en.phtml` - Welcomemail2en view
- `welcomemailda.phtml` - Welcomemailda view
- `welcomemailen.phtml` - Welcomemailen view


### Photo (3 templates)

**Purpose:** Photo management and galleries

**Templates:**

- `sendphotouploadreminderda.phtml` - Sendphotouploadreminderda view
- `sendphotouploadreminderen.phtml` - Sendphotouploadreminderen view
- `showuploadform.phtml` - Showuploadform view


### Rooms (9 templates)

**Purpose:** Room and facility management - bookings, layouts

**Templates:**

- `confirmdelete.phtml` - Confirmdelete view
- `create.phtml` - Create view
- `edit.phtml` - Edit view
- `imageoverview.phtml` - Imageoverview view
- `main.phtml` - Main view
- `roomuse.phtml` - Roomuse view
- `sleepstatistics.phtml` - Sleepstatistics view
- `visalle.phtml` - Visalle view
- `vislokale.phtml` - Vislokale view


### Setup (1 templates)

**Purpose:** Initial system setup wizard

**Templates:**

- `form.phtml` - Form view


### Shop (1 templates)

**Purpose:** Shop and product management - inventory, sales, statistics

**Templates:**

- `overview.phtml` - Overview view


### Signup (1 templates)

**Purpose:** Public signup forms and pages

**Templates:**

- `signuppages.phtml` - Signuppages view


### Sms (2 templates)

**Purpose:** SMS messaging interface

**Templates:**

- `autodryrun.phtml` - Autodryrun view
- `showstats.phtml` - Showstats view


### Tickets (1 templates)

**Purpose:** Support ticketing system

**Templates:**

- `mainpage.phtml` - Mainpage view


### Wear (13 templates)

**Purpose:** Merchandise/uniform management - items, sizes, distribution

**Templates:**

- `attributes.phtml` - Attributes view
- `detailedminilist.phtml` - Detailedminilist view
- `detailedorderlist.phtml` - Detailedorderlist view
- `displaydelete.phtml` - Displaydelete view
- `displayhandout.phtml` - Displayhandout view
- `editwear.phtml` - Editwear view
- `main.phtml` - Main view
- `noresults.phtml` - Noresults view
- `showprintlabels.phtml` - Showprintlabels view
- `showtypes.phtml` - Showtypes view
- `showwear.phtml` - Showwear view
- `uploadimage.phtml` - Uploadimage view
- `wearbreakdown.phtml` - Wearbreakdown view


## JavaScript Modules

The application uses custom JavaScript modules for enhanced functionality:
- `activity.js`
- `admin.js`
- `admin_functions.js`
- `ajax.js`
- `aktivitet.js`
- `backbone.js`
- `bootstrap.js`
- `bscafe.js`
- `checkin_interface.js`
- `common.js`
- `create_and_checkin.js`
- `drag_and_drop.js`
- `edit-diy.js`
- `entrance.js`
- `filereader.js`
- `food.js`
- `food_handout.js`
- `gallery.js`
- `gameactivity.js`
- `gamestart_master.js`
- `gamestart_minion.js`
- `gamestartdetails.js`
- `gamestartqueue.js`
- `gds.js`
- `idcards.js`
- `idtemplate.js`
- `imwedit.js`
- `index.js`
- `jQuery-File-Upload-9.9.3/main.js`
- `javascript.js`
- `json2.js`
- `loans.js`
- `location-module.js`
- `log.js`
- `markdown/set.js`
- `modernizr.custom.09365.js`
- `newsletter.js`
- `participant.js`
- `participant_sleeparea.js`
- `payment.js`
- `photo-cropper.js`
- `prices.js`
- `prototype.js`
- `rcolor.js`
- `register_mobilepay.js`
- `register_payments.js`
- `rooms-imageoverview.js`
- `rooms.js`
- `search.js`
- `setup.js`
- `shop.js`
- `show_all.js`
- `signup/admin/config/controls.js`
- `signup/admin/config/render.js`
- `signup/admin/config/toolbar_buttons.js`
- `signup/admin/controls.js`
- `signup/admin/pages/controls.js`
- `signup/admin/pages/render.js`
- `signup/admin/toolbar.js`
- `signup/preprocess.js`
- `signup/render.js`
- `tickets/Ticket-282fa5ca.js`
- `tickets/Ticket-6b8b45b3.js`
- `tickets/Tickets-3f916131.js`
- `tickets/Tickets-cb60e8a8.js`
- `tickets/index-00a8b370.js`
- `tickets/index-ca2caa21.js`
- `tickets/users.service-e3a1e411.js`
- `tickets/users.service-f75ac69f.js`
- `todo.js`
- `tradeablefood.js`
- `underscore-min.js`
- `wear.js`
- `wear_attributes.js`
- `wear_handout.js`
- `weardetails.js`
- `wearlist.js`


## Page Types

### Admin Pages
- User management
- Role and privilege management
- System configuration
- Data import/export tools

### Participant-Facing Pages
- Login/authentication
- Profile viewing and editing
- Schedule viewing
- Payment interface
- Check-in kiosk

### Staff/Organizer Pages
- Participant listing and search
- Activity management
- Schedule coordination
- GDS shift management
- Resource allocation (rooms, food, wear)
- Shop management
- Board game library
- Equipment lending
- Ticketing system
- Newsletter creation
- SMS broadcasting

### Public Pages
- Signup forms (configurable multi-step)
- Information display

## Key UI Patterns

### Data Tables
Most list views use DataTables for:
- Sorting
- Pagination
- Search/filtering
- Column visibility toggle

### In-Place Editing
Many fields support in-place editing (jQuery Editable) for quick updates without full page reload.

### AJAX Forms
Forms often submit via AJAX for:
- Faster response
- Partial page updates
- Better user experience

### Modal Dialogs
jQuery UI dialogs used for:
- Confirmations
- Quick edits
- Detail views
- Forms

### Calendar Views
GDS and scheduling use calendar/grid views for visual planning.

## Migration to Angular

### Recommended Angular Component Structure

```
/src/app
  /core
    - auth/
    - guards/
    - interceptors/
    - services/
  
  /shared
    - components/
    - directives/
    - pipes/
    - models/
  
  /features
    /participants
      - participant-list/
      - participant-detail/
      - participant-edit/
      - participant-checkin/
      - participant-payment/
      - services/
      
    /activities
      - activity-list/
      - activity-detail/
      - activity-schedule/
      - services/
      
    /gds
      - gds-calendar/
      - shift-editor/
      - category-manager/
      - services/
      
    /shop
      - product-list/
      - sales-tracker/
      - statistics/
      - services/
      
    /food
      - food-types/
      - order-management/
      - reports/
      - services/
    
    /entrance
      - entrance-types/
      - entry-tracking/
      - services/
    
    /wear
      - wear-items/
      - size-tracker/
      - distribution/
      - services/
    
    /rooms
      - room-list/
      - booking-calendar/
      - services/
    
    /boardgames
      - game-catalog/
      - loan-tracker/
      - presence-check/
      - rankings/
      - services/
    
    /loans
      - item-list/
      - loan-tracker/
      - services/
    
    /tickets
      - ticket-list/
      - ticket-detail/
      - services/
    
    /newsletter
      - newsletter-editor/
      - newsletter-list/
      - subscription-manager/
      - services/
    
    /admin
      - user-management/
      - role-management/
      - system-config/
      - services/
    
    /signup
      - signup-form/
      - page-editor/
      - config-manager/
      - services/
```

### UI Library Recommendations

1. **Angular Material** - Comprehensive component library
   - Tables with sorting/pagination
   - Forms and form controls
   - Dialogs and modals
   - Date pickers
   - Navigation components

2. **FullCalendar** or **DayPilot** - For GDS scheduling
   - Calendar views
   - Drag-and-drop
   - Resource scheduling

3. **Chart.js** or **ngx-charts** - For statistics/graphs
   - Bar charts
   - Line charts
   - Pie charts

4. **ngx-datatable** - If Material tables insufficient
   - Advanced features
   - Virtual scrolling
   - Tree tables

### State Management

Consider **NgRx** for complex state:
- Participant management
- Shopping cart
- Schedule coordination
- Multi-step signup forms

Or lighter solutions:
- **Services with BehaviorSubject** for simpler cases
- **Angular signals** (Angular 16+)

### Key Angular Features to Use

1. **Reactive Forms** - For complex forms with validation
2. **Lazy Loading** - For feature modules
3. **Route Guards** - For authentication/authorization
4. **Interceptors** - For API calls, error handling
5. **Pipes** - For data formatting (dates, currency, etc.)
6. **Directives** - For reusable behaviors
7. **Standalone Components** (Angular 14+) - For modern architecture

### Internationalization (i18n)

The system has Danish text throughout. Use:
- **@ngx-translate** or **Angular i18n**
- Extract all hardcoded text to resource files
- Support Danish and English at minimum

### Routing Strategy

Implement hierarchical routing matching current URL structure:

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'deltager', 
    loadChildren: () => import('./features/participants/participants.module')
  },
  { 
    path: 'aktivitet', 
    loadChildren: () => import('./features/activities/activities.module')
  },
  // ... etc
];
```

### Progressive Migration

Consider progressive migration strategy:
1. Start with API consumption (new Angular → existing PHP API)
2. Migrate read-only views first
3. Then forms and edit views
4. Complex interactions last
5. Use iframe or micro-frontend approach for gradual transition
