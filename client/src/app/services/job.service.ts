import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl =
    'https://place-x-project-hwht.vercel.app/api/jobs'

  constructor(
    private http: HttpClient
  ) {}

  getJobs() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  getJob(id: string) {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );

  }

  createJob(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );

  }

}