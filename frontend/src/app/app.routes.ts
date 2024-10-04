import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagoComponent } from './pago/pago.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pago', component: PagoComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];