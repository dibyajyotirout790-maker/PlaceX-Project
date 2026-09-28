import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient) {}

  // ==========================================
  // GET LOGGED-IN STUDENT
  // ==========================================
  private getStudentId(): string | null {

    const userData = localStorage.getItem('user');

    if (!userData) {
      console.error('No user found in localStorage');
      return null;
    }

    try {

      const user = JSON.parse(userData);

      console.log('Logged in user:', user);

      return user._id || user.id || user.userId || null;

    } catch (error) {

      console.error('Could not read user:', error);

      return null;
    }
  }


  // ==========================================
  // APPLY FOR JOB
  // ==========================================
  apply(jobId: string) {

    const token = localStorage.getItem('token');
    const studentId = this.getStudentId();

    console.log('==============================');
    console.log('APPLYING FOR JOB');
    console.log('Student ID:', studentId);
    console.log('Job ID:', jobId);
    console.log('Token exists:', !!token);
    console.log('==============================');

    if (!studentId) {

      throw new Error(
        'Student ID not found. Please logout and login again.'
      );
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`
          }
        : {})
    });

    return this.http.post<any>(
      this.apiUrl,
      {
        student: studentId,
        job: jobId
      },
      {
        headers
      }
    );
  }


  // ==========================================
  // GET MY APPLICATIONS
  // ==========================================
  getMyApplications() {

    const studentId = this.getStudentId();

    console.log('GET MY APPLICATIONS');
    console.log('Student ID:', studentId);

    if (!studentId) {

      throw new Error(
        'Student ID not found. Please login again.'
      );
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      ...(token
        ? {
            Authorization: `Bearer ${token}`
          }
        : {})
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/student/${studentId}`,
      {
        headers
      }
    );
  }
}