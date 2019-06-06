import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Logger } from '../core/logger.service';
import { TokenService } from '../core/authentication/token.service';
import { Constants } from '@app/shared/constants';
import { LoggedUserService } from '@app/core/logged-user.service';

const log = new Logger('EmployeeGuard');

@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService, private loggedUserService: LoggedUserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedUserService.hasRole(Constants.EMPLOYEE_ROLE)) {
      return true;
    } else {
      this.router.navigate([this.loggedUserService.getRouteForUser()], { replaceUrl: true });
    }

    return false;
  }
}
