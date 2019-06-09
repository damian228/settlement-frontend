import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ListChunk, SalaryDTO } from '@app/shared/dto';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/constants';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SalaryService } from '@app/payroll/salary/salary.service';

@Injectable()
export class SalaryResolver implements Resolve<ListChunk<SalaryDTO> | {}> {
  constructor(private salaryService: SalaryService, private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.salaryService.getSalaryList(Constants.INITIAL_SALARY_FILTER).pipe(
      catchError(err => {
        if (err && err.status === 400 && err.error.message) this.toastrService.info(err.error.message);
        return of({});
      })
    );
  }
}
