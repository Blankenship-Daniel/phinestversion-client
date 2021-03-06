import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SongRank } from '../Models/songRank.model';
import { ShowRank } from '../Models/showRank.model';
import { YearRank } from '../Models/yearRank.model';
import { UserRank } from '../Models/userRank.model';

import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {

  constructor(
    private http: Http
  ) { }

  searchSongs(songName: string) : Observable<SongRank[]> {
    let request: string = environment.api + '/songs/search/' + songName;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  searchShows(showDate: string) : Observable<ShowRank[]> {
    let request: string = environment.api + '/shows/search/' + showDate;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  searchYears(year: string) : Observable<YearRank[]> {
    let request: string = environment.api + '/years/search/' + year;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  searchUsers(username: string) : Observable<UserRank[]> {
    let request: string = environment.api + '/users/search/' + username;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
