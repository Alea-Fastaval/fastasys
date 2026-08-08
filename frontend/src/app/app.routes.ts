import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ParticipantsComponent } from './features/participants/participants.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { HeroForceComponent } from './features/hero-force/hero-force.component';
import { SignupComponent } from './features/signup/signup.component';
import { ShopComponent } from './features/shop/shop.component';
import { ResourcesComponent } from './features/resources/resources.component';
import { BoardgamesComponent } from './features/boardgames/boardgames.component';
import { CommunicationsComponent } from './features/communications/communications.component';
import { authGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'participants', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'participants', component: ParticipantsComponent, canActivate: [authGuard] },
  { path: 'activities', component: ActivitiesComponent, canActivate: [authGuard] },
  { path: 'hero-force', component: HeroForceComponent, canActivate: [authGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [authGuard] },
  { path: 'boardgames', component: BoardgamesComponent, canActivate: [authGuard] },
  { path: 'communications', component: CommunicationsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'participants' },
];
