import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
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

  getVoteTypeBySubmissionId(submissionId: number, userId: number) : Observable<number> {
    let request: string = this.apiEndpoint + '/votes/type?submission_id=' +
                          submissionId + '&user_id=' + userId;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  submitVote(submissionId: number, userId: number, voteType: string) : Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    let request: string = this.apiEndpoint + '/votes/save';
    let body: string = JSON.stringify({
      'submission_id' : submissionId,
      'user_id'       : userId,
      'vote_type'     : voteType
    });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
