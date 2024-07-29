import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../alert/alert.service';

@Component({
  selector: 'app-form-alumnos',
  templateUrl: './form-alumnos.component.html',
  styleUrl: './form-alumnos.component.scss'
})
export class FormAlumnosComponent {

  @Output()
  alumnosCreate = new EventEmitter();
  

  alumnosForm: FormGroup; 

  constructor( private fb: FormBuilder,private alertService:AlertService  ){
    this.alumnosForm = this.fb.group({
      firstName: this.fb.control('',
        [ 
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        lastName: this.fb.control('',
          [ 
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ]),
      email: this.fb.control('',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      password: this.fb.control('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]
      )

      
    });
      
  }

  onSubmit(): void {
    if (this.alumnosForm.invalid) {
      this.alumnosForm.markAllAsTouched();
      this.alertService.showMessage('Error Al Ingresar Datos');
      setTimeout(() => this.alertService.hideMessage(), 2000);
    } else {
      this.alumnosCreate.emit(this.alumnosForm.value);
      this.alumnosForm.reset();
    }
  }

}
