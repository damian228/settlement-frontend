import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '@app/core';
import { LoggedUserService } from '@app/core/logged-user.service';
import { Constants } from '@app/shared/constants';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService, private loggedUserService: LoggedUserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedUserService.hasRole(Constants.MANAGER_ROLE)) {
      return true;
    } else {
      this.router.navigate([this.loggedUserService.getRouteForUser()], { replaceUrl: true });
    }

    return false;
  }
}
