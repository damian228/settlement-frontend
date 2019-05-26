import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BillDTO } from '@app/shared/dto';
import { BillService } from '@app/employee/bill/bill.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable()
export class BillResolver implements Resolve<BillDTO | {}> {
  constructor(private billService: BillService, private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.billService.getActual().pipe(
      catchError(err => {
        if (err && err.status === 400 && err.error.message) this.toastrService.info(err.error.message);
        return of({});
      })
    );
  }
}
