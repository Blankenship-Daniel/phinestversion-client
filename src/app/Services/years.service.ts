import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class YearsService {
  private endpoint = 'http://localhost:8000/years';

  constructor(private http: Http) {}
}
