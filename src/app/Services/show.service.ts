import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Show } from '../Models/show.model';
import { ShowRank } from '../Models/showRank.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ShowService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getShowRankings(limit: number, offset: number) : Observable<ShowRank[]> {
    let request: string = this.apiEndpoint + '/shows/rankings?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getShowRankingsByYear(year: string) : Observable<ShowRank[]> {
    let request: string = this.apiEndpoint + '/shows/rankings/' + year;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getShowRankingByDate(date: string) : Observable<ShowRank[]> {
    let request: string = this.apiEndpoint + '/shows/rankings/' + date;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getAllShows() : Observable<Show[]> {
    let request: string = this.apiEndpoint + '/shows';
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
