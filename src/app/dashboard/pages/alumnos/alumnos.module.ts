import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormAlumnosComponent } from './form-alumnos/form-alumnos.component';


@NgModule({
  declarations: [
    AlumnosComponent,
    FormAlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule
  ],
  exports:[
    AlumnosComponent,
    FormAlumnosComponent
  ]
})
export class AlumnosModule { }
