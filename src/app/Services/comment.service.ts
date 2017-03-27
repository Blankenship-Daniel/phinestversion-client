import { Comment } from '../Models/comment.model';
import { CommentListSize } from '../Models/commentListSize.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import * as api from '../../environments/api.config';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommentService {

  constructor(
    private http: Http
  ) { }

  /**
   * Returns the total number of comments corresponding to a given submission.
   * @param  {number}                        submissionId the id for a given
   *                                                       submission in the
   *                                                       `submissions` table
   *                                                       in the database.
   * @return {Observable<CommentListSize[]>}
   */
  getCommentsBySubmissionIdCount(submissionId: number) : Observable<CommentListSize[]> {
    let request: string = api.BASE_URL + '/comments/count/submission/'
      + submissionId;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Returns a batch of comments corresponding to a given submission.
   * @param  {number}                submissionId the id for a given submissionId
   *                                               in the `submissions` table in
   *                                               the database.
   * @param  {number}                limit        the size of the batch to be
   *                                               returned.
   * @param  {number}                offset       defines the start of the batch.
   * @return {Observable<Comment[]>}
   */
  getCommentsBySubmissionId(submissionId: number, limit: number, offset: number) : Observable<Comment[]> {
    let request: string = api.BASE_URL + '/comments/submission/'
      + submissionId + '?limit=' + limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Submits a comment to the `comments` table in the database.
   * @param  {number}                submissionId the id for a given submission
   *                                               in the `submissions` table in
   *                                               the database.
   * @param  {number}                userId       the id for the user that
   *                                               submitted the comment.
   * @param  {string}                comment      the comment string.
   * @return {Observable<Comment[]>}
   */
  submitComment(submissionId: number, userId: number, comment: string) : Observable<Comment[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let request: string = api.BASE_URL + '/comments/save';
    let body: string = JSON.stringify({
      submission_id: submissionId,
      user_id: userId,
      comment: comment
    });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
