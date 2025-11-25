import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   {
      path: '',
      component: LoginComponent,
    },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginComponentModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule), canActivate: [AuthGuard] },
  { path: 'transfers', loadChildren: () => import('./transfer/transfer.module').then(m => m.TransfersModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
