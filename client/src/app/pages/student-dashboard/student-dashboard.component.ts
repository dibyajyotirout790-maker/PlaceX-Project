import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent
  implements OnInit {

  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    console.log(
      '===== STUDENT DASHBOARD ====='
    );

    this.user =
      this.authService.getUser();

    console.log(
      'Dashboard user:',
      this.user
    );

    if (!this.user) {

      console.log(
        'No logged-in user found.'
      );

      this.router.navigate(['/login']);

      return;
    }

    console.log(
      'Dashboard user name:',
      this.user.name
    );

    console.log(
      'Dashboard user email:',
      this.user.email
    );
  }

  logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
}
  }



