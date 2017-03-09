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

  /**
   * Requests all votes corresponding to a given submission.
   * @param  {number}             submissionId the id of a submission
   *                                            in the `submissions` table of
   *                                            the database.
   * @return {Observable<Vote[]>}
   */
  getVotesBySubmissionId(submissionId: number) : Observable<Vote[]> {
    let request: string = this.apiEndpoint + '/votes/submission/' +
                          submissionId;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Requests the vote type on a given submission corresponding to a given user.
   * @param  {number}             submissionId the id of a submission in the
   *                                            `submissions` table of the
   *                                            database.
   * @param  {number}             userId       the id of a user in the `users`
   *                                            table of the database.
   * @return {Observable<number>}              Either `-1|1`. -1 corresponds to
   *                                            a `down` vote. 1 corresponds to
   *                                            an `up` vote.
   */
  getVoteTypeBySubmissionId(submissionId: number, userId: number) : Observable<number> {
    let request: string = this.apiEndpoint + '/votes/type?submission_id=' +
                          submissionId + '&user_id=' + userId;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Saves a new vote for a given user corresponding to a given submission.
   * @param  {number}              submissionId the id of a submission in the
   *                                             `submissions` table of the
   *                                             database.
   * @param  {number}              userId       the id of a user in the `users`
   *                                             table of the database.
   * @param  {string}              voteType     a string representing the type
   *                                             of vote on a given submission.
   *                                             Either `up|''|down`.
   * @return {Observable<boolean>}              true if the requests was
   *                                             successful, false otherwise.
   */
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
