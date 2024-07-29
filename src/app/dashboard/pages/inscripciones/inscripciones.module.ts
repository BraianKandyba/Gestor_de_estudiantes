import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { FormInscripcionesComponent } from './form-inscripciones/form-inscripciones.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    InscripcionesComponent,
    FormInscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule
  ],
  exports:[
    InscripcionesComponent,
    FormInscripcionesComponent
  ]
})
export class InscripcionesModule { }
