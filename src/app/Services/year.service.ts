import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { YearRank } from '../Models/yearRank.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class YearService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getYearRankings() : Observable<YearRank[]> {
    return this.http.get(this.apiEndpoint + '/years/rankings')
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }
}
