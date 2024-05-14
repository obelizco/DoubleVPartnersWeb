import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { AuthService } from './auth.service';
import { Observable, catchError, map, mergeMap, of, switchMap, throwError } from 'rxjs';
import { Validators } from 'src/app/utils/Validators';
import { IResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public params = new HttpParams();
  public basePatch: string = environment.API
  public headers$: HttpHeaders | undefined;
  private token: string | undefined;
  private userId: string | undefined;
  constructor(
    private _http: HttpClient,
    private readonly auth$: AuthService
  ) {
    this.auth$.getToken.pipe(switchMap((value)=>this.auth$.getId.pipe(mergeMap((userId) => { 
      return of({ userId: userId,token: value})
    })))).subscribe(res => {
      console.log(res)
      this.token = res.token;
      this.userId = res.userId;
      this.init();
    });
  }
  init(): void {
    this.headers$ = this.httpOptions();
  }

  private httpOptions(): HttpHeaders {
    if (this.token) {
      return this.jsonAuth();
    }
    return this.notAuth();
  }

  private jsonAuth = (): HttpHeaders =>
    new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('uid',this.userId!);


  private notAuth = () =>
    new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

  public get<T>(
    url: string,
    params?: HttpParams,
    endpoint?: string
  ): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    const headers = {
      headers: this.headers$,
      params,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http.get<IResponse<T>>(path$, headers).pipe(
      map((res) => {
        const { data } = res;
        return data;
      }),
      catchError(this.handleError)
    );
  }

  public post<T>(
    url: string,
    data?: any | FormData,
    endpoint?: string,
    responseType?: string
  ): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    const requestOptions: { [x: string]: string | any } = {
      headers: this.headers$,
      responseType: responseType ? responseType : null,
    };
    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.post<IResponse<T>>(path$, data, requestOptions).pipe(
      map((res) => {
        const { data } = res;
        return data;
      }),
      catchError(this.handleError)
    );
  }
  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError(error);
  }
}
