import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from '../Models/user.model';
import { UserRank } from '../Models/userRank.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getUserRankings(limit: number, offset: number) : Observable<UserRank[]> {
    let request: string = this.apiEndpoint + '/users/rankings/?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getUserByUserName(username: string) : Observable<UserRank[]> {
    let request: string = this.apiEndpoint + '/users/' + username;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  authUser(email: string, pass: string) : Observable<User[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    let request: string = this.apiEndpoint + '/users/auth';
    let body: string = JSON.stringify({ 'email': email, 'password': pass });
    return this.http.post(request, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
