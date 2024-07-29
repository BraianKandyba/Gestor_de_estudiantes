import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../alert/alert.service';

@Component({
  selector: 'app-form-cursos',
  templateUrl: './form-cursos.component.html',
  styleUrl: './form-cursos.component.scss'
})
export class FormCursosComponent {

  @Output()
  cursoCreate = new EventEmitter();
  

  cursosForm: FormGroup;

  constructor( private fb: FormBuilder, private alertService:AlertService  ){
    this.cursosForm = this.fb.group({
      name: this.fb.control('',
        [ 
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      turno: this.fb.control('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      diasCursada: this.fb.control('',Validators.required,),

      fechaInicio: this.fb.control('',Validators.required,),
    });
      
  }

  onSubmit(): void {
    if (this.cursosForm.invalid) {
      this.cursosForm.markAllAsTouched();
      this.alertService.showMessage('Error Curso no cargado');
      setTimeout(() => this.alertService.hideMessage(), 2000);
    } else {
      this.cursoCreate.emit(this.cursosForm.value);
      this.cursosForm.reset();

    }
  }

}
