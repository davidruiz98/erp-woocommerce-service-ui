import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [  { path: 'clientes', loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule), canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: '**', redirectTo: 'login' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
