import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentRequest } from 'src/app/core/models/enrollment.model';
import { EnrollmentService } from 'src/app/core/services/enrollment.service';

@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.component.html',
  styleUrls: ['./enroll-form.component.scss']
})
export class EnrollFormComponent {

  @Input() courseId!: number;
  @Input() availableSpots!: number;
  @Output() enrollmentError = new EventEmitter<string>();
  @Output() enrollmentSuccess = new EventEmitter<void>();

  enrollForm: FormGroup;
  successMessage = '';
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService) {
      this.enrollForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
      this.enrollForm.get('fullName')?.addValidators(Validators.minLength(3));
    }

  onSubmit(): void {
    if(this.enrollForm.invalid) {
      return;
    }

    if(this.availableSpots <= 0) {
      this.enrollmentError.emit('El curso no tiene cupos disponibles');
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';

    const request: EnrollmentRequest = {
      fullName: this.enrollForm.value.fullName,
      email: this.enrollForm.value.email,
    }

    this.enrollmentService.enrollStudent(this.courseId, request).subscribe({
      next: () => {
        this.successMessage = '¡Inscripción exitosa! Te has registrado correctamente al curso.';
        this.enrollForm.reset();
        this.isSubmitting = false;
        this.enrollmentSuccess.emit();
        
        // Limpiar el mensaje local después de 2 segundos (el mensaje principal se muestra en el padre)
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        const errorMessage = error.error?.message || 'Error al inscribirse';
        const translatedMessage = this.translateErrorMessage(errorMessage);
        this.enrollmentError.emit(translatedMessage);
      }
    })
  }

  get fullName() {
    return this.enrollForm.get('fullName');
  }

  get email() {
    return this.enrollForm.get('email');
  }

  private translateErrorMessage(message: string): string {
    const translations: { [key: string]: string } = {
      'Course is full': 'El curso no tiene cupos disponibles',
      'Student is already enrolled in this course': 'El estudiante ya está inscripto en este curso',
      'The course was just updated by another user. Please try again.': 'El curso fue actualizado por otro usuario. Por favor, intenta nuevamente.',
      'Full name is required': 'El nombre completo es requerido',
      'Email is required': 'El email es requerido',
      'Must be a well-formed email address': 'Debe ser una dirección de email válida'
    };

    return translations[message] || message;
  }

}
