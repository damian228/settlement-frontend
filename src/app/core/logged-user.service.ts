import { Injectable } from '@angular/core';
import { CommonStorageService } from '@app/core/common.storage.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/constants';

@Injectable()
export class LoggedUserService {
  constructor(private commonStorageService: CommonStorageService, private toastrService: ToastrService) {}

  getRouteForUser(): string {
    if (!this.commonStorageService.userFront) {
      this.toastrService.error('Fatal Error User Not logged');
      return Constants.LOGIN_ROUTE;
    }
    const role: string = this.commonStorageService.userFront.role;
    return Constants.ROOT_ROUTE + role.toLowerCase();
  }

  hasRole(role: string): boolean {
    return this.commonStorageService.userFront && this.commonStorageService.userFront.role === role;
  }
}
