import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl ='https://place-x-project-hwht.vercel.app/api/applications'

  constructor(
    private http: HttpClient
  ) {}

  // ================================
  // AUTH HEADERS
  // ================================

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`
    });
  }


  // ================================
  // APPLY FOR JOB
  // ================================

  apply(jobId: string) {
  const token = localStorage.getItem('token');

  return this.http.post<any>(
    this.apiUrl,
    {
      student: localStorage.getItem('userId'),
      job: jobId
    },
    {
      headers: token
        ? new HttpHeaders({
            Authorization: `Bearer ${token}`
          })
        : undefined
    }
  );
}

getMyApplications(studentId: string) {
  const token = localStorage.getItem('token');

  return this.http.get<any[]>(
    `${this.apiUrl}/student/${studentId}`,
    {
      headers: token
        ? new HttpHeaders({
            Authorization: `Bearer ${token}`
          })
        : undefined
    }
  );
}
}