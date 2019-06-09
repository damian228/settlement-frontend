import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillAccountNumberDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class BillService {
  constructor(private httpClient: HttpClient) {}

  markBillProcessed(billId: number): Observable<Object> {
    return this.httpClient.put(`/payroll/bill/${billId}/mark-processed`, null);
  }

  getBill(billId: number): Observable<BillAccountNumberDTO> {
    return this.httpClient.get(`/payroll/bill/${billId}/show`).pipe(
      map((bill: BillAccountNumberDTO) => {
        return this.mapTimestampToDate(bill);
      })
    );
  }

  getActual(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillAccountNumberDTO>> {
    return this.httpClient
      .skipErrorHandler()
      .post('/payroll/bill/actual', pageableFilterDTO)
      .pipe(map((response: ListChunk<BillAccountNumberDTO>) => response));
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillAccountNumberDTO>> {
    return this.httpClient
      .post('/payroll/bill/archived', pageableFilterDTO)
      .pipe(map((response: ListChunk<BillAccountNumberDTO>) => response));
  }

  mapTimestampToDate(bill: BillAccountNumberDTO) {
    return { ...bill, from: new Date(bill.from), to: new Date(bill.to) };
  }
}
