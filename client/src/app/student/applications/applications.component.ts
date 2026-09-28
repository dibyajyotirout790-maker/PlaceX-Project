import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  ApplicationService
} from '../../core/services/application.service';


@Component({
  selector: 'app-applications',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl:
    './applications.component.html',

  styleUrl:
    './applications.component.css'
})
export class ApplicationsComponent
  implements OnInit {

  applications: any[] = [];

  loading = false;

  error = '';


  constructor(
    private applicationService:
      ApplicationService
  ) {}


  ngOnInit(): void {

    this.loadApplications();

  }


  loadApplications(): void {

    console.log(
      '===== LOADING APPLICATIONS ====='
    );

    this.loading = true;

    this.error = '';


    this.applicationService
      .getMyApplications()
      .subscribe({

        next: (data) => {

          console.log(
            'MY APPLICATIONS:',
            data
          );

          this.applications =
            data || [];

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'APPLICATION LOAD ERROR:',
            error
          );

          this.loading = false;

          this.error =
            error.error?.message ||
            'Failed to load applications.';

        }

      });

  }

}