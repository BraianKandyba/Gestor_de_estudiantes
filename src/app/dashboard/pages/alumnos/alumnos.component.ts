import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './alumnos.service';
import { Alumnos } from './modelos/alumnos';
import { AlertService } from '../../../../alert/alert.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'password','acciones'];

  dataSource: Alumnos[] =[];
  spiner:boolean = true;

  constructor(private alumnosService: AlumnosService, private alertService:AlertService){}

  ngOnInit(): void {
      this.getAlumnos();
  }  

  getAlumnos(): void{
    this.alumnosService.getUsers().subscribe({
    next: (alumnos) =>{
      this.dataSource = alumnos;
      this.spiner =false;
    },
    complete: ()=>{
      console.log('completado');
      this.spiner =false;
    }
  }) 
}
  
onAlumnosSudmited(evento: Alumnos): void{ 
  this.alumnosService.createAlumnos(evento).subscribe({
    next:(alumnos)=>{
      this.dataSource = [...alumnos];
    },
    complete:()=>{
      this.alertService.showMessage('Alumno Cargado Correctamente');
      setTimeout(() => this.alertService.hideMessage(), 2000);
    }
  })
}

onDeleteAlumnos(evento:Alumnos){ 

  this.alumnosService.deleteAlumnos(evento.id).subscribe({
    next:(alumnos)=>{
      this.dataSource = [...alumnos];
    },
    complete:()=>{
      this.alertService.showMessage('Alumno Eliminado Correctamente');
      setTimeout(() => this.alertService.hideMessage(), 2000);
    }
  })
}



}
