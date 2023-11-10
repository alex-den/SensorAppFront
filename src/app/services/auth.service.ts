import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
	return this.http.post(
	  AUTH_API + 'signin',
	    {
	      username,
	      password,
	    }, { headers: headers, withCredentials: true }
	    );
	  }


  logout(): Observable<any> {
	return this.http.post(AUTH_API + 'signout', { }, { headers: headers, withCredentials: true });
  }
  
}
