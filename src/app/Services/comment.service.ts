import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Comment } from '../Models/comment.model';
import { CommentListSize } from '../Models/commentListSize.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommentService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getCommentsBySubmissionIdCount(submissionId: number) : Observable<CommentListSize[]> {
    let request: string = this.apiEndpoint + '/comments/count/submission/'
      + submissionId;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getCommentsBySubmissionId(submissionId: number, limit: number, offset: number) : Observable<Comment[]> {
    let request: string = this.apiEndpoint + '/comments/submission/'
      + submissionId + '?limit=' + limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  submitComment(submissionId: number, userId: number, comment: string) : Observable<Comment[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let request: string = this.apiEndpoint + '/comments/save';
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
