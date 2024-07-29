import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: 'home',
        loadChildren:()=>import('./pages/home/home.module').then((m)=>m.HomeModule)
      },
      {
        path: 'cursos',
        loadChildren:()=>import('./pages/cursos/cursos.module').then((m)=>m.CursosModule)
      },
      {
        path: 'alumnos',
        loadChildren:()=>import('./pages/alumnos/alumnos.module').then((m)=>m.AlumnosModule)
      },
      {
        path: 'inscripciones',
        loadChildren:()=>import('./pages/inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
