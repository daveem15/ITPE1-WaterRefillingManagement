import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:3000/auth/';
  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post<any>(this.BASE_URL + 'signup', user);
  }
  login(email: string, password: string) {
    return this.http.post<Users>(this.BASE_URL + 'login', {
      email: email,
      password: password,
    });
  }
  getAllUsers() {
    return this.http.get<Users[]>(this.BASE_URL);
  }
  updateUsers(id: number, user: Users) {
    const url = `${this.BASE_URL}update`;
    const params = new HttpParams().set('id', id);
    return this.http.put<any>(url, user, { params });
  }
  deleteUser(id: number) {
    const url = `${this.BASE_URL}delete`;
    const params = new HttpParams().set('id', id);
    return this.http.delete<any>(url, { params });
  }
}
