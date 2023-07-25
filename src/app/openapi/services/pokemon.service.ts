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

import { Pokemon } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `pokemonGet()` */
  static readonly PokemonGetPath = '/pokemon';

  /**
   * Retrieves all pokemons given a specific user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pokemonGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  pokemonGet$Response(
    params: {
      userId: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<Pokemon>>> {
    const rb = new RequestBuilder(this.rootUrl, PokemonService.PokemonGetPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Pokemon>>;
      })
    );
  }

  /**
   * Retrieves all pokemons given a specific user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pokemonGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pokemonGet(
    params: {
      userId: string;
    },
    context?: HttpContext
  ): Observable<Array<Pokemon>> {
    return this.pokemonGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Pokemon>>): Array<Pokemon> => r.body)
    );
  }

  /** Path part for operation `pokemonPut()` */
  static readonly PokemonPutPath = '/pokemon';

  /**
   * Edits a pokemon information in the system.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pokemonPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pokemonPut$Response(
    params?: {
      body?: Pokemon
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, PokemonService.PokemonPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Edits a pokemon information in the system.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pokemonPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pokemonPut(
    params?: {
      body?: Pokemon
    },
    context?: HttpContext
  ): Observable<void> {
    return this.pokemonPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `pokemonPost()` */
  static readonly PokemonPostPath = '/pokemon';

  /**
   * Creates a new pokemon in the system.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pokemonPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pokemonPost$Response(
    params?: {
      body?: {
'pokemon'?: Pokemon;
'userId'?: string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, PokemonService.PokemonPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Creates a new pokemon in the system.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pokemonPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pokemonPost(
    params?: {
      body?: {
'pokemon'?: Pokemon;
'userId'?: string;
}
    },
    context?: HttpContext
  ): Observable<void> {
    return this.pokemonPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
