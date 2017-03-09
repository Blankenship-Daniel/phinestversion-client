import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Song } from '../Models/song.model';
import { SongRank } from '../Models/songRank.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SongService {

  private apiEndpoint = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

  /**
   * Requests a batch of song rankings from the database.
   * @param  {number}                 limit  the size of the batch requested.
   * @param  {number}                 offset where the batch starts.
   * @return {Observable<SongRank[]>}
   */
  getSongRankings(limit: number, offset: number) : Observable<SongRank[]> {
    let request: string = this.apiEndpoint + '/songs/rankings?limit=' +
                          limit + '&start=' + offset;
    return this.http.get(request)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Request a specific song ranking from the database that matches a specific
   *  song slug.
   * @param  {string}                 slug the URI friendly version of the
   *                                        requested song. For example,
   *                                        `You Enjoy Myself` would be
   *                                        `you-enjoy-myself`
   * @return {Observable<SongRank[]>}
   */
  getSongRanking(slug: string) : Observable<SongRank[]> {
    return this.http.get(this.apiEndpoint + '/songs/rankings/' + slug)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(
                error.json().error || 'Server error'
              ));
  }

  /**
   * Requests all songs from the database.
   * @return {Observable<Song[]>}
   */
  getAllSongs() : Observable<Song[]> {
    return this.http.get(this.apiEndpoint + '/songs')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(
              error.json().error || 'Server error'
            ));
  }
}
