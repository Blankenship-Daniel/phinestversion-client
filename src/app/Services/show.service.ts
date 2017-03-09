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

  /**
   * Requests a batch of show rankings.
   * @param  {number}                 limit  the size of the batch.
   * @param  {number}                 offset where the batch request starts.
   * @return {Observable<ShowRank[]>}
   */
  getShowRankings(limit: number, offset: number) : Observable<ShowRank[]> {
    let request: string = this.apiEndpoint + '/shows/rankings?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Requests all show rankings corresponding to a given year.
   * @param  {string}                 year the string representation of a year.
   *                                        For example, 1997.
   * @return {Observable<ShowRank[]>}
   */
  getShowRankingsByYear(year: string) : Observable<ShowRank[]> {
    let request: string = this.apiEndpoint + '/shows/rankings/' + year;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Requests all show rankings corresponding to a given date.
   * @param  {string}                 date the string representation of a given
   *                                        show date. For example, 12/31/1995.
   * @return {Observable<ShowRank[]>}
   */
  getShowRankingByDate(date: string) : Observable<ShowRank[]> {
    let request: string = this.apiEndpoint + '/shows/rankings/' + date;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Requests all shows in the database.
   * @return {Observable<Show[]>} 
   */
  getAllShows() : Observable<Show[]> {
    let request: string = this.apiEndpoint + '/shows';
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
