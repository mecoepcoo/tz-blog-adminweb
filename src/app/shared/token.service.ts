import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() { }

  token = '';

  setToken(token) {
    this.token = 'JwtUser ' + token;
  }
}