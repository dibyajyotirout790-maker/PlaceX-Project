import { Routes } from '@angular/router';

import { LoginComponent }
  from './component/auth/login/login.component';

import { RegisterComponent }
  from './pages/register/register.component';

import { StudentDashboardComponent }
  from './pages/student-dashboard/student-dashboard.component';

import { JobComponent }
  from './pages/jobs/job.component';

import { ApplicationsComponent }
  from './student/applications/applications.component';

import { ProfileComponent }
  from './pages/profile/profile.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'student-dashboard',
    component: StudentDashboardComponent
  },

  {
    path: 'jobs',
    component: JobComponent
  },

  {
    path: 'applications',
    component: ApplicationsComponent
  },

  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];