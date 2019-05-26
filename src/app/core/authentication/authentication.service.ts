import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { LoginContext, LoginContextDTO, TokenDTO } from '@app/shared/dto';
import { CommonStorageService } from '@app/core/common.storage.service';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(private tokenService: TokenService, private httpClient: HttpClient, private commonStorageService: CommonStorageService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user token.
   */
  login(context: LoginContext): Observable<TokenDTO> {
    return this.httpClient
      .skipErrorHandler()
      .post<TokenDTO>('/auth/auth/login', new LoginContextDTO(context.login, context.password))
      .pipe(
        tap(res => this.tokenService.setToken(res, context.remember)),
        shareReplay()
      );
  }

  /**
   * Logs out the user and clear token.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.tokenService.setToken();
    this.commonStorageService.setUserFront();
    return of(true);
  }
}
