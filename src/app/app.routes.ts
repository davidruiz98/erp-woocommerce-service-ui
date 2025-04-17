import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductosListComponent } from './productos/productos-list/productos-list.component';

import { AuthGuard } from './auth/auth.guard';
import { ProductoDetalleComponent } from './productos/producto-detalle/producto-detalle.component';
import { ProductoPreciosComponent } from './productos/producto-precios/producto-precios.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'productos',
    component: ProductosListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/:id',
    component: ProductoDetalleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos/:id/precios',
    component: ProductoPreciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'productos'
  }
];

export const appRouter = provideRouter(routes);
