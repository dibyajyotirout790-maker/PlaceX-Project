import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ApplicationService
} from '../../core/services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,

  imports: [
    CommonModule
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

    this.loading = true;
    this.error = '';

    this.applicationService
      .getMyApplications()
      .subscribe({

        next: (data) => {

          console.log(
            "MY APPLICATIONS:",
            data
          );

          this.applications =
            data || [];

          this.loading = false;

        },

        error: (error) => {

          console.error(
            "APPLICATIONS LOAD ERROR:",
            error
          );

          this.loading = false;

          this.error =
            error?.error?.message ||
            "Unable to load applications.";
        }

      });

  }

}