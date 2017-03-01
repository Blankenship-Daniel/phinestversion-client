import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Vote } from '../Models/vote.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VoteService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getVotesBySubmissionId(submissionId: number) : Observable<Vote[]> {
    let request: string = this.apiEndpoint + '/votes/submission/' +
                          submissionId;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
