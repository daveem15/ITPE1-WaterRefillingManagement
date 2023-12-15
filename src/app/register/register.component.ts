import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [
        '',
        [Validators.required, this.passwordsMatchValidator],
      ],
      mobileNumber: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const user = {
        fullname: this.registrationForm.get('name')?.value ?? '',
        email: this.registrationForm.get('email')?.value ?? '',
        address: this.registrationForm.get('address')?.value ?? '',
        password: this.registrationForm.get('password')?.value ?? '',
        mobile_number: this.registrationForm.get('mobileNumber')?.value ?? '',
        gender: this.registrationForm.get('gender')?.value ?? '',
        age: +this.registrationForm.get('age')?.value ?? 0,
      };

      this.authService.register(user).subscribe({
        next: (data: any) => {
          this.toastr.success(data['message'] || 'Successfully Created!');
          this.location.back();
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastr.error(err.error.message || 'Bad Request');
          } else {
            this.toastr.error('An error occurred during registration.');
          }
        },
        complete: () => {},
      });
    }
  }

  // Use arrow function to bind 'this' context
  private passwordsMatchValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return this.doPasswordsMatch(control);
  };

  // Helper function to check if passwords match
  private doPasswordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordsDoNotMatch: true };
    }

    return null;
  }
}
