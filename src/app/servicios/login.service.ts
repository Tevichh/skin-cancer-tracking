import { Injectable } from '@angular/core';
import { appSettings } from '../../settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { Access } from '../interfaces/access.interface';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = appSettings.apiUrl;

  constructor(private http : HttpClient) { }

  Login(user:Login): Observable<Access>{
    return this.http.post<Access>(`${this.apiUrl}/login`, user)
  }

  verificarToken(): Observable<Auth>{
    return this.http.get<any>(`${this.apiUrl}/verify/token`)
  }
}
