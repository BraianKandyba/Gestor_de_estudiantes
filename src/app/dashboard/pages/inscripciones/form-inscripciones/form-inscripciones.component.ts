import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../alert/alert.service';

@Component({
  selector: 'app-form-inscripciones',
  templateUrl: './form-inscripciones.component.html',
  styleUrl: './form-inscripciones.component.scss'
})
export class FormInscripcionesComponent {

  @Output()
  inscCreate = new EventEmitter();
  
  inscripcionesForm: FormGroup; 

  constructor( private fb: FormBuilder, private alertService: AlertService  ){
    this.inscripcionesForm = this.fb.group({
      usuarioId: this.fb.control('',Validators.required),
      cursoId: this.fb.control('',Validators.required)
    })
  }

  
  onSubmit(): void {
    if (this.inscripcionesForm.invalid) {
      this.inscripcionesForm.markAllAsTouched();
      this.alertService.showMessage('Error al Realizar Inscripcion');
      setTimeout(() => this.alertService.hideMessage(), 2000);
    } else {
      this.inscCreate.emit(this.inscripcionesForm.value);
      this.inscripcionesForm.reset();
      
    }
  }

}