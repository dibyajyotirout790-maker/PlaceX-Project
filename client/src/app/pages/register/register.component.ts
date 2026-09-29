import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'student';

  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  private apiUrl: string = 'https://place-x-project-hwht.vercel.app/api/auth/register'

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.loading = true;

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    console.log('REGISTER DATA:', data);

    this.http.post<any>(this.apiUrl, data).subscribe({

      next: (response) => {

        console.log('REGISTER SUCCESS:', response);

        this.loading = false;

        this.successMessage =
          'Registration successful! Redirecting to login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (error) => {

        console.error('REGISTER ERROR:', error);

        this.loading = false;

        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'Registration failed. Please try again.';
        }
      }

    });
  }
}