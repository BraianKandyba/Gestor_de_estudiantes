import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumnos } from './modelos/alumnos';
import { environment } from '../../../../enviroment/enviroment.prod';
import { delay, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService { 

  constructor(private httpClient: HttpClient) { }

  getUsers(){ 
    return this.httpClient.get<Alumnos[]>(`${environment.apiURL}/alumnos`).pipe(delay(2000))
  }

  createAlumnos(dataLoad: Alumnos){
    return this.httpClient.post<Alumnos[]>(`${environment.apiURL}/alumnos`,dataLoad).pipe(
      mergeMap(()=> this.getUsers())
    )
  }

  
  deleteAlumnos(userID: number){ 
    return this.httpClient.delete<Alumnos>(`${environment.apiURL}/alumnos/${userID}`).pipe(
      mergeMap(()=> this.getUsers())
    )
  }

  getAlumnoById(id:number | string): Observable<Alumnos | undefined>{
    return this.httpClient.get<Alumnos>(`${environment.apiURL}/alumnos/${id}`);
    }
}
