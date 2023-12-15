import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      this.authService.login(email, password).subscribe({
        next: (data: Users) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.toastr.success(
            'Successfully Logged in!',
            'Welcome ' + data.fullname
          );
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'unknown error');
        },
      });
    }

    console.log();
  }
}
