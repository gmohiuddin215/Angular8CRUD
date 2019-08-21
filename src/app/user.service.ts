import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError)
      );
  }

  addUser(data) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(catchError(this.handleError)
      );
  }

  updateUser(id: number, data) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
    .pipe(catchError(this.handleError)
      );
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError)
      );
  }

  getUserList() {
    return this.http.get<User>(this.baseUrl);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    return throwError('Something bad happened. Please try again later.');
  }

}
