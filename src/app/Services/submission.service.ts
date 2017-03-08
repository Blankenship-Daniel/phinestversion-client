import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
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

  saveSubmission(song_id: number, show_id: number, description: string, user_id: number, score: number) : Observable<Submission[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let request: string = this.apiEndpoint + '/submissions/save';
    let body: string = JSON.stringify({
      song_id: song_id,
      show_id: show_id,
      description: description,
      user_id: user_id,
      score: score
    });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }


  saveSubmissionScore(submissionId: number, newScore: number) : Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    let request: string = this.apiEndpoint + '/submissions/save/score';
    let body: string = JSON.stringify({
      'submission_id' : submissionId,
      'score'         : newScore
    });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
