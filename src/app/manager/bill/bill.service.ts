import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BillService {
  constructor(private httpClient: HttpClient) {}

  acceptBill(billId: number): Observable<Object> {
    return this.httpClient.put(`/manager/bill/${billId}/accept`, null);
  }

  rejectBill(billId: number): Observable<Object> {
    return this.httpClient.put(`/manager/bill/${billId}/reject`, null);
  }

  getBill(billId: number): Observable<BillDTO> {
    return this.httpClient.get(`/manager/bill/${billId}/show`).pipe(
      map((bill: BillDTO) => {
        return this.mapTimestampToDate(bill);
      })
    );
  }

  getActual(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillDTO>> {
    return this.httpClient
      .skipErrorHandler()
      .post('/manager/bill/actual', pageableFilterDTO)
      .pipe(map((response: ListChunk<BillDTO>) => response));
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillDTO>> {
    return this.httpClient.post('/manager/bill/archived', pageableFilterDTO).pipe(map((response: ListChunk<BillDTO>) => response));
  }

  mapTimestampToDate(bill: BillDTO) {
    return { ...bill, from: new Date(bill.from), to: new Date(bill.to) };
  }
}
