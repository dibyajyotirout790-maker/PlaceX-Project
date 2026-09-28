import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  error = '';
  successMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    console.log('===== LOGIN STARTED =====');
    console.log('Email:', this.email);

    this.error = '';
    this.successMessage = '';
    this.loading = true;

    const data = {
      email: this.email.trim(),
      password: this.password
    };

    console.log('Sending login request:', data);

    this.authService.login(data).subscribe({

      next: (response: any) => {

        console.log('===== LOGIN SUCCESS =====');
        console.log('Server response:', response);

        this.loading = false;

        // Save token + user together
        this.authService.saveSession(response);

        this.successMessage = 'Login successful!';

        console.log(
          'Saved user:',
          this.authService.getUser()
        );

        // Redirect according to role
        if (response.user?.role === 'student') {

          this.router.navigate(['/student-dashboard']);

        } else if (response.user?.role === 'recruiter') {

          this.router.navigate(['/recruiter-dashboard']);

        } else {

          this.error = 'Unknown user role.';
        }
      },

      error: (err: any) => {

        console.error('===== LOGIN ERROR =====');
        console.error('Status:', err.status);
        console.error('Error:', err);
        console.error('Server response:', err.error);

        this.loading = false;

        this.error =
          err.error?.message ||
          'Invalid email or password.';
      }

    });
  }
}