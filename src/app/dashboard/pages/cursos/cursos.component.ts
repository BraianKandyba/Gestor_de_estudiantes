import { Component, OnInit } from '@angular/core';
import { Cursos } from './modelos/cursos';
import { CursosService } from './cursos.service';
import { AlertService } from '../../../../alert/alert.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'turno', 'diasCursada', 'fechaInicio','acciones'];

  dataSource: Cursos[] =[];

  spiner:boolean = true;

  constructor(
    private cursosService : CursosService,
    private alertService :AlertService
    ){}
  ngOnInit(): void {
    this.getCursos();
  }

  
  getCursos(): void{
      this.cursosService.getCursos().subscribe({
      next: (cursos) =>{
        this.dataSource = cursos;
        this.spiner =false;

      },
      complete: ()=>{
        console.log('completado');
        this.spiner =false;
      }
    }) 
  }

  onCursosSudmited(evento: Cursos): void{ 
    this.cursosService.createCurso(evento).subscribe({
      next:(cursos)=>{
        this.dataSource = [...cursos];
      },
      complete:()=>{
        this.alertService.showMessage('Curso Cargado Correctamente');
        setTimeout(() => this.alertService.hideMessage(), 2000);
      }
    })
  }

  onDeleteCursos(evento:Cursos){ 

    this.cursosService.deleteCurso(evento.id).subscribe({
      next:(cursos)=>{
        this.dataSource = [...cursos];
      },
      complete:()=>{
        this.alertService.showMessage('Curso Eliminado Correctamente');
        setTimeout(() => this.alertService.hideMessage(), 2000);
      }
    })
  }


}
