import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EmployeeInfoDTO } from '@app/shared/dto';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InfoService } from '@app/manager/info/info.service';

@Injectable()
export class InfoResolver implements Resolve<EmployeeInfoDTO[] | {}> {
  constructor(private infoService: InfoService, private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.infoService.getEmployees().pipe(
      catchError(err => {
        if (err && err.status === 400 && err.error.message) this.toastrService.info(err.error.message);
        return of({});
      })
    );
  }
}
