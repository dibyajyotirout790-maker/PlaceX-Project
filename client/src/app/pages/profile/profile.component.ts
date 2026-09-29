import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  finalize
} from 'rxjs/operators';

import {
  AuthService
} from '../../core/services/auth.service';


@Component({
  selector: 'app-profile',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:
    './profile.component.html',

  styleUrl:
    './profile.component.css'
})
export class ProfileComponent
  implements OnInit {

  name = '';
  email = '';
  phone = '';
  college = '';
  branch = '';
  cgpa: number | null = null;
  skills = '';

  success = '';
  error = '';

  loading = false;

  private apiUrl ='https://place-x-project-hwht.vercel.app/api/profile'


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.loadProfile();

  }


  // =================================
  // LOAD PROFILE
  // =================================

  loadProfile(): void {

    const token =
      this.authService.getToken();

    if (!token) {

      this.error =
        'Please login first.';

      return;
    }

    const headers =
      new HttpHeaders({
        Authorization:
          `Bearer ${token}`
      });


    this.http
      .get<any>(
        this.apiUrl,
        { headers }
      )
      .subscribe({

        next: (response) => {

          const user =
            response?.user || response;

          this.name =
            user?.name || '';

          this.email =
            user?.email || '';

          this.phone =
            user?.phone || '';

          this.college =
            user?.college || '';

          this.branch =
            user?.branch || '';

          this.cgpa =
            user?.cgpa ?? null;

          this.skills =
            Array.isArray(user?.skills)
              ? user.skills.join(', ')
              : user?.skills || '';

        },

        error: (error) => {

          console.error(
            'PROFILE LOAD ERROR:',
            error
          );

          this.error =
            error?.error?.message ||
            'Unable to load profile.';
        }

      });

  }


  // =================================
  // UPDATE PROFILE
  // =================================

  updateProfile(): void {

    this.success = '';
    this.error = '';

    const token =
      this.authService.getToken();

    if (!token) {

      this.error =
        'Please login first.';

      return;
    }

    this.loading = true;


    const headers =
      new HttpHeaders({
        Authorization:
          `Bearer ${token}`,
        'Content-Type':
          'application/json'
      });


    const data = {

      name: this.name,

      phone: this.phone,

      college: this.college,

      branch: this.branch,

      cgpa: this.cgpa,

      skills: this.skills

    };


    console.log(
      'UPDATING PROFILE:',
      data
    );


    this.http
      .put<any>(
        this.apiUrl,
        data,
        { headers }
      )
      .pipe(

        finalize(() => {

          this.loading = false;

        })

      )
      .subscribe({

        next: (response) => {

          console.log(
            'PROFILE UPDATED:',
            response
          );


          this.success =
            response?.message ||
            'Profile updated successfully!';


          const updatedUser =
            response?.user;


          if (updatedUser) {

            this.authService
              .saveUser(updatedUser);

          }

        },

        error: (error) => {

          console.error(
            'PROFILE UPDATE ERROR:',
            error
          );


          this.error =
            error?.error?.message ||
            `Profile update failed. HTTP ${error.status || 0}`;

        }

      });

  }

}