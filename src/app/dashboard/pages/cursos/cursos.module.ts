import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import {HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { FormCursosComponent } from './form-cursos/form-cursos.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    CursosComponent,
    FormCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[
    CursosComponent,
    FormCursosComponent
  ]
})
export class CursosModule { }
