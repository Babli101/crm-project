import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { Leads } from './admin/leads/leads';
import { AddLead } from './admin/add-lead/add-lead';
import { EditLead } from './admin/edit-lead/edit-lead';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'leads',
    component: Leads
  },
  {
    path: 'add-lead',
    component: AddLead
  },
  {
    path: 'edit-lead/:id',
    component: EditLead
  }
];