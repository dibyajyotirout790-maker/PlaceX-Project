import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { JobService }
  from '../../services/job.service';

import { ApplicationService }
  from '../../core/services/application.service';

@Component({
  selector: 'app-job',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './job.component.html',

  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  jobs: any[] = [];

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {

    console.log('Loading jobs...');

    this.jobService.getJobs().subscribe({

      next: (data: any[]) => {

        console.log('JOBS RESPONSE:', data);

        this.jobs = data;

        console.log(
          'JOB COUNT:',
          this.jobs.length
        );

        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error(
          'Jobs loading error:',
          error
        );

      }

    });

  }

apply(jobId: string): void {

  console.log('Apply button clicked');
  console.log('Job ID:', jobId);

  if (!jobId) {
    alert('Job ID is missing.');
    return;
  }

  this.applicationService.apply(jobId).subscribe({

    next: (response) => {

      console.log('Application successful:', response);

      alert(
        response?.message ||
        'Application submitted successfully!'
      );

    },

    error: (error) => {

      console.error('Application failed:', error);

      alert(
        error?.error?.message ||
        error?.message ||
        'Application failed'
      );

    }

  });
}
}