import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.service';
import { AlumnosService } from '../alumnos/alumnos.service';
import { CrearInscripcionesData, inscripciones } from './modelos/inscripciones';
import { InscripcionesService } from './inscripciones.service';
import { forkJoin, from, of, switchMap } from 'rxjs';
import { AlertService } from '../../../../alert/alert.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'usuarioId',
    'fullName',
    'cursoId',
    'name', 
    'turno',
    'diasCursada',
    'fechaInicio',
    'acciones'
  ];

  inscripciones: inscripciones[] = [];
  dataSource: CrearInscripcionesData[] = [];
  spiner:boolean = true;


  constructor(
    private cursoService: CursosService,
    private alumnoService: AlumnosService,
    private inscripcionesService: InscripcionesService,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
    this.loadInscripciones();
  }

  loadInscripciones(): void {
    this.inscripcionesService.getInscripciones().subscribe({
      next: (inscripciones) => {
        this.inscripciones = inscripciones;
        this.loadDetails();
        this.spiner = false
      },
      complete: () => {
        console.log('Carga de inscripciones completada');
        this.spiner = false

      }
    });
  }


  loadDetails(): void {
    const requests$ = this.inscripciones.map((inscripcion) => {
      const alumnoRequest$ = inscripcion.usuarioId ?
      this.alumnoService.getAlumnoById(inscripcion.usuarioId) : of(undefined);
      const cursoRequest$ = inscripcion.cursoId ?
      this.cursoService.getCursosById(inscripcion.cursoId) : of(undefined);
  
      return forkJoin({
        alumno: alumnoRequest$,
        curso: cursoRequest$
      }).pipe(
        switchMap(({ alumno, curso }) => {
          inscripcion.usuario = alumno !== null ? alumno : undefined;
          inscripcion.curso = curso !== null ? curso : undefined;
          return of(inscripcion); 
        })
      );
    });
  
    forkJoin(requests$).subscribe((inscripciones) => {
      this.dataSource = inscripciones;
    });
  }

  onInscSudmited(evento: inscripciones): void {
    const inscripto = this.dataSource.some(inscripcion =>
      inscripcion.usuarioId === evento.usuarioId && inscripcion.cursoId === evento.cursoId
    );
    if (inscripto) {
      // console.log('El alumno ya está inscrito en este curso');
      this.alertService.showMessage('El alumno ya está inscrito en este curso');
      setTimeout(() => this.alertService.hideMessage(), 2000);
      return;
    }
  
    this.inscripcionesService.createinscripciones(evento).subscribe({
      next: (insc) => {
        this.dataSource = [...insc];
        this.loadInscripciones();
      },
      complete: () => {
        this.alertService.showMessage('Inscripción realizada con éxito');
        setTimeout(() => this.alertService.hideMessage(), 2000);
      }
    });
  }


  onDeleteInsc(evento:inscripciones){ 
    this.inscripcionesService.deleteInscripciones(evento.id).subscribe({
      next:(insc)=>{
        this.dataSource = [...insc];
        this.loadInscripciones();

      },
      complete:()=>{
        this.alertService.showMessage('Inscripcion Eliminada Con Exito');
        setTimeout(() => this.alertService.hideMessage(), 2000);
      }
    })
  }
  


}
