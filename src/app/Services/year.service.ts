import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { YearRank } from '../Models/yearRank.model';

import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class YearService {

  constructor(
    private http: Http
  ) { }

  /**
   * Requests all year ranking in the database.
   * @return {Observable<YearRank[]>}
   */
  getYearRankings() : Observable<YearRank[]> {
    return this.http.get(environment.api + '/years/rankings')
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Request the year ranking for a given year.
   * @param  {string}                 year a string representation of a specific
   *                                        year. For example, `1997`.
   * @return {Observable<YearRank[]>}
   */
  getYearRanking(year: string) : Observable<YearRank[]> {
    return this.http.get(environment.api + '/years/rankings/' + year)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
