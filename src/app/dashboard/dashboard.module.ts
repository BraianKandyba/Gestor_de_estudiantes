import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './pages/home/home.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HomeModule,
    CursosModule,
    AlumnosModule,
    InscripcionesModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
