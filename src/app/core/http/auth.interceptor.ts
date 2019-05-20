import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../authentication/token.service';
import { Constants } from '@app/shared/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.token;

    if (token && token.value) {
      const cloned = req.clone({
        headers: req.headers.set(Constants.AUTH_HEADER_KEY, token.value)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
