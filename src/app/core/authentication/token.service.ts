import { Injectable } from '@angular/core';
import { Constants } from '@app/shared/constants';
import { TokenDTO } from '@app/shared/dto';
import * as decodePayload from 'jwt-decode';
import { CommonStorageService } from '@app/core/common.storage.service';

/**
 * Provides storage for authentication token.
 * The UserFront interface should be replaced with proper implementation.
 */
@Injectable()
export class TokenService {
  private _token: TokenDTO | null = null;
  private _tokenKey = Constants.TOKEN_KEY;

  constructor(private commonStorageService: CommonStorageService) {
    const savedToken = sessionStorage.getItem(this._tokenKey) || localStorage.getItem(this._tokenKey);
    if (savedToken) {
      this._token = JSON.parse(savedToken);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this.token && this.token.exp > Date.now() / 1000;
  }

  /**
   * Gets the user token.
   * @return The user token or null if the user is not authenticated.
   */
  get token(): TokenDTO | null {
    return this._token;
  }

  /**
   * Sets the user token.
   * The token may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the token are only persisted for the current session.
   * @param token The user token.
   * @param remember True to remember token across sessions.
   */
  setToken(token?: TokenDTO, remember?: boolean) {
    this._token = token || null;

    if (token) {
      let decoded: any = decodePayload(token.value);
      this.commonStorageService.setUserFront(decoded);
      token.exp = decoded.exp;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(this._tokenKey, JSON.stringify(token));
    } else {
      sessionStorage.removeItem(this._tokenKey);
      localStorage.removeItem(this._tokenKey);
    }
  }

  getDecoded(tokenDTO?: TokenDTO): any {
    let token = tokenDTO || this._token;
    if (!token) {
      return null;
    }
    let decoded = decodePayload(token.value);
    console.log(decoded);
    return decoded;
  }
}
