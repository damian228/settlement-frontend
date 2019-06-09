import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { InvoiceDetailsDTO, InvoiceDTO, ListChunk } from '@app/shared/dto';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/constants';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InvoiceService } from '@app/payroll/invoice/invoice.service';

@Injectable()
export class InvoiceResolver implements Resolve<ListChunk<InvoiceDetailsDTO> | {}> {
  constructor(private invoiceService: InvoiceService, private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.invoiceService.getActive(Constants.INITIAL_INVOICE_FILTER).pipe(
      catchError(err => {
        if (err && err.status === 400 && err.error.message) this.toastrService.info(err.error.message);
        return of({});
      })
    );
  }
}
