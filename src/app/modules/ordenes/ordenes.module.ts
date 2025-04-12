import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenesRoutingModule } from './ordenes-routing.module';
import { OrdenesComponent } from './ordenes.component';
import { ListaComponent } from './lista/lista.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';


@NgModule({
  declarations: [
    OrdenesComponent,
    ListaComponent,
    CrearComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule
  ]
})
export class OrdenesModule { }
