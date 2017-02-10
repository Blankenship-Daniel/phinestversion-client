import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Submission } from '../Models/submission.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubmissionService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getSubmissionsBySongSlug(slug: string, limit: number, offset: number) : Observable<Submission[]> {
    let request: string = this.apiEndpoint + '/submissions/slug/' + slug + '?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getSubmissionsByShowDate(date: string) : Observable<Submission[]> {
    let request: string = this.apiEndpoint + '/submissions/rankings/' + date;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getSubmissionsByUserName(username: string, limit: number, offset: number) : Observable<Submission[]> {
    let request: string = this.apiEndpoint + '/submissions/user/' + username +
                          '?limit=' + limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
