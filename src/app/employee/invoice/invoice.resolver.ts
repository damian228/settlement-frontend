import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { InvoiceDTO, ListChunk } from '@app/shared/dto';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InvoiceService } from '@app/employee/invoice/invoice.service';

@Injectable()
export class InvoiceResolver implements Resolve<ListChunk<InvoiceDTO> | {}> {
  private initialPageSize = 5;

  constructor(private invoiceService: InvoiceService, private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.invoiceService.getActual({ pageNumber: 0, pageSize: this.initialPageSize }).pipe(
      catchError(err => {
        if (err && err.status === 400 && err.error.message) this.toastrService.info(err.error.message);
        return of({});
      })
    );
  }
}
