import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Admin } from './pages/admin/admin';
import { Tracking } from './pages/tracking/tracking';
import { LoginComponent } from './login/login';
import { authGuard } from './services/auth-guard';
import { FeedbackFormComponent } from './feedback-form/feedback-form';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  { path: 'tracking', component: Tracking },
  { path: 'login', component: LoginComponent },
   { path: 'feedback', component: FeedbackFormComponent },
  { path: '**', redirectTo: '' }
];
