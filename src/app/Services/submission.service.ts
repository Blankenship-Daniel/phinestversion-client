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

  /**
   * Requests a batch of submissions corresponding to a given song slug.
   * @param  {string}                   slug   the URI friendly version of the
   *                                            requested song. For example,
   *                                            `You Enjoy Myself` would be
   *                                            `you-enjoy-myself`.
   * @param  {number}                   limit  the size of the requested batch.
   * @param  {number}                   offset where the batch request starts.
   * @return {Observable<Submission[]>}
   */
  getSubmissionsBySongSlug(slug: string, limit: number, offset: number) : Observable<Submission[]> {
    let request: string = this.apiEndpoint + '/submissions/slug/' + slug + '?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Request all submissions corresponding to a show date.
   * @param  {string}                   date a string representation of a show
   *                                          date. For example, 12/31/1995.
   * @return {Observable<Submission[]>}
   */
  getSubmissionsByShowDate(date: string) : Observable<Submission[]> {
    let request: string = this.apiEndpoint + '/submissions/rankings/' + date;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Request a batch of submissions for a given user.
   * @param  {string}                   username the username of a given user.
   *                                              For example, `Gumbomaniac`.
   * @param  {number}                   limit    the size of the requested batch.
   * @param  {number}                   offset   where the batch request starts.
   * @return {Observable<Submission[]>}
   */
  getSubmissionsByUserName(username: string, limit: number, offset: number) : Observable<Submission[]> {
    let request: string = this.apiEndpoint + '/submissions/user/' + username +
                          '?limit=' + limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Saves a new submission in the `submissions` table in the database.
   * @param  {number}                   song_id     the id of a given song in
   *                                                 the `songs` table in the
   *                                                 database.
   * @param  {number}                   show_id     the id of a given show in
   *                                                 the `shows` table in the
   *                                                 database.
   * @param  {string}                   description the user description of a
   *                                                 specific song on a specific
   *                                                 date.
   * @param  {number}                   user_id     the id of the user who
   *                                                 submitted the song.
   * @param  {number}                   score       the submission score. Will
   *                                                 likely be set to 0.
   * @return {Observable<Submission[]>}
   */
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


  /**
   * Updates the submission score on a given submission
   * @param  {number}              submissionId the id of the submission to be
   *                                             updated.
   * @param  {number}              newScore     the updated score value.
   * @return {Observable<boolean>}              [description]
   */
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
