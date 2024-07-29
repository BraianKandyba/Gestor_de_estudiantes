import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearInscripcionesData, inscripciones } from './modelos/inscripciones';
import { environment } from '../../../../enviroment/enviroment.prod';
import { delay, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private httpClient: HttpClient) { }

  getInscripciones(){ 
    return this.httpClient.get<inscripciones[]>(`${environment.apiURL}/inscripciones`).pipe(delay(1000))
  }

  createinscripciones(dataLoad: CrearInscripcionesData){
    return this.httpClient.post<inscripciones[]>(`${environment.apiURL}/inscripciones`,dataLoad).pipe(
      mergeMap(()=> this.getInscripciones())
    )
  } 

  
  deleteInscripciones(inscripcionId: number|string){ 
    return this.httpClient.delete<inscripciones[]>(`${environment.apiURL}/inscripciones/${inscripcionId}`).pipe(
      mergeMap(()=> this.getInscripciones())
    ) 
  }
}
