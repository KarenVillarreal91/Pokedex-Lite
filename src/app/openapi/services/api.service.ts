/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';


@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `statusGet()` */
  static readonly StatusGetPath = '/status';

  /**
   * is server running?.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statusGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  statusGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.StatusGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'blob', accept: 'application/string', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * is server running?.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `statusGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statusGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<string> {
    return this.statusGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
