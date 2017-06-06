import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../Models/user.model';
import { UserRank } from '../Models/userRank.model';

import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  /**
   * Requests a batch of user rankings.
   * @param  {number}                 limit  the size of the requested batch.
   * @param  {number}                 offset where the batch begins.
   * @return {Observable<UserRank[]>}
   */
  getUserRankings(limit: number, offset: number) : Observable<UserRank[]> {
    let request: string = environment.api + '/users/rankings?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Requests a user based off of a username.
   * @param  {string}                 username the username of a given user in
   *                                            the database.
   * @return {Observable<UserRank[]>}
   */
  getUserByUserName(username: string) : Observable<UserRank[]> {
    let request: string = environment.api + '/users/' + username;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Returns user data if the user is authenticated (exists) in the `users` table.
   * @param  {string}             email the email corresponding to a given user
   *                                     in the `users` table in the database.
   * @param  {string}             pass  the plain text password for a given user.
   * @return {Observable<User[]>}
   */
  authUser(email: string, pass: string) : Observable<User[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    let request: string = environment.api + '/users/auth';
    let body: string = JSON.stringify({ 'email': email, 'password': pass });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Saves user data in the `users` table if the user data authenticates.
   * @param  {string}             email the email corresponding to a given user
   *                                     in the `users` table in the database.
   * @param  {string}             pass  the plain text password for a given user.
   * @return {Observable<User[]>}
   */
  registerUser(image: string, username: string, email: string, pass: string) : Observable<User[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    let request: string = environment.api + '/users/register';
    let body: string = JSON.stringify({ 'image': image, 'username': username, 'email': email, 'password': pass });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
