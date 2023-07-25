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

import { Body } from '../models/body';
import { InlineResponse200 } from '../models/inline-response-200';

@Injectable({ providedIn: 'root' })
export class SecurityService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loginPost()` */
  static readonly LoginPostPath = '/login';

  /**
   * Allow a user to be autenticated.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginPost$Response(
    params?: {
      body?: Body
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InlineResponse200>> {
    const rb = new RequestBuilder(this.rootUrl, SecurityService.LoginPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InlineResponse200>;
      })
    );
  }

  /**
   * Allow a user to be autenticated.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginPost(
    params?: {
      body?: Body
    },
    context?: HttpContext
  ): Observable<InlineResponse200> {
    return this.loginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<InlineResponse200>): InlineResponse200 => r.body)
    );
  }

}
