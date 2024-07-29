import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.prod';
import { Cursos } from './modelos/cursos';
import { delay, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) {
  
  }
  getCursos(){ 
    return this.httpClient.get<Cursos[]>(`${environment.apiURL}/cursos`).pipe(delay(2000))
  }

  createCurso(dataLoad: Cursos){

    return this.httpClient.post<Cursos[]>(`${environment.apiURL}/cursos`,dataLoad).pipe(
      mergeMap(()=> this.getCursos())
    )
  }

  
  deleteCurso(userID: number){ 
    return this.httpClient.delete<Cursos>(`${environment.apiURL}/cursos/${userID}`).pipe(
      mergeMap(()=> this.getCursos())
    ) 
  }

  getCursosById(id:number | string): Observable<Cursos | undefined>{
    return this.httpClient.get<Cursos>(`${environment.apiURL}/cursos/${id}`);
    }
}
