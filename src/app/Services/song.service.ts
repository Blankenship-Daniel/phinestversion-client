import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SongRank } from '../Models/songRank.model';
import { Song } from '../Models/song.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SongService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  getSongRankings(limit: number, offset: number) : Observable<SongRank[]> {
    let request: string = this.apiEndpoint + '/songs/rankings?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getSongRanking(slug: string) : Observable<SongRank[]> {
    return this.http.get(this.apiEndpoint + '/songs/rankings/' + slug)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  getAllSongs() : Observable<Song[]> {
    return this.http.get(this.apiEndpoint + '/songs')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(
              error.json().error || 'Server error'
            ));
  }
}
