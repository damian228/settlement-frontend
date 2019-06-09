import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BillAccountNumberDTO, ListChunk } from '@app/shared/dto';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/constants';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BillService } from '@app/payroll/bill/bill.service';

@Injectable()
export class BillResolver implements Resolve<ListChunk<BillAccountNumberDTO> | {}> {
  constructor(private billService: BillService, private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.billService.getActual(Constants.INITIAL_BILL_FILTER).pipe(
      catchError(err => {
        if (err && err.status === 400 && err.error.message) this.toastrService.info(err.error.message);
        return of({});
      })
    );
  }
}
