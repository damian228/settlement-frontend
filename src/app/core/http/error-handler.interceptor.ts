import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { Logger } from '@app/core/logger.service';
import { Constants } from '@app/shared/constants';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }

    if (response && response.status === 401) {
      this.router.navigate([Constants.LOGIN_ROUTE], { queryParams: { redirect: this.router.routerState.snapshot.url }, replaceUrl: true });
    } else if (response && response.status === 400 && response.error.message) {
      this.toastrService.error(response.error.message);
    } else if (response && response.status === 500 && response.error.timestamp) {
      this.toastrService.error(`Unexpected error occurred, errorID: ${response.error.timestamp}`);
    }

    throw response;
  }
}
