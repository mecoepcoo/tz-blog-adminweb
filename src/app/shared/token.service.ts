import { Injectable } from '@angular/core';
import { StorageService } from '@shared/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private storageSrv: StorageService,
  ) { }

  token: string = this.storageSrv.token;

  setToken(token) {
    this.token = 'JwtUser ' + token;
  }
}