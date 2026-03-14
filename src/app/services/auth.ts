import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   api = "http://localhost:5000/api/auth";

  constructor(private http: HttpClient) {}

  login(data:any){
    return this.http.post(`${this.api}/login`, data);
  }

}
