import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillDTO, CreateBillDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BillService {
  constructor(private httpClient: HttpClient) {}

  generateBill(createBillDTO: CreateBillDTO): Observable<BillDTO> {
    return this.httpClient
      .post('/employee/bill/generate', this.mapDateToTimestamp(createBillDTO))
      .pipe(map((bill: BillDTO) => this.mapTimestampToDate(bill)));
  }

  updateBill(billId: number, createBillDTO: CreateBillDTO): Observable<BillDTO> {
    return this.httpClient
      .put(`/employee/bill/${billId}/update`, this.mapDateToTimestamp(createBillDTO))
      .pipe(map((bill: BillDTO) => this.mapTimestampToDate(bill)));
  }

  sendBill(billId: number): Observable<Object> {
    return this.httpClient.put(`/employee/bill/${billId}/send`, null);
  }

  getActual(): Observable<BillDTO> {
    return this.httpClient
      .skipErrorHandler()
      .get('/employee/bill/actual')
      .pipe(
        map((bill: BillDTO) => {
          return this.mapTimestampToDate(bill);
        })
      );
  }

  getBill(billId: number): Observable<BillDTO> {
    return this.httpClient
      .skipErrorHandler()
      .get(`/employee/bill/${billId}/show`)
      .pipe(
        map((bill: BillDTO) => {
          return this.mapTimestampToDate(bill);
        })
      );
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<BillDTO>> {
    //return this.httpClient.post('/employee/bill/archived', pageableFilterDTO).pipe(map((response: ListChunk<BillDTO>) => response));
    if (pageableFilterDTO.pageSize == 1) {
      if (pageableFilterDTO.pageNumber == 0) {
        return of({
          list: [
            {
              id: 1,
              employeeId: 'employee',
              brutto: 2000,
              netto: 1712.0,
              incomeCosts: 400.0,
              tax: 288.0,
              hours: 80,
              salary: 25,
              settlementNumber: 'TEST1',
              from: 1556402400000,
              to: 1558908000000
            }
          ],
          count: 3,
          hasNext: true
        });
      } else if (pageableFilterDTO.pageNumber == 1) {
        return of({
          list: [
            {
              id: 2,
              employeeId: 'employee',
              brutto: 2000,
              netto: 1712.0,
              incomeCosts: 400.0,
              tax: 288.0,
              hours: 80,
              salary: 25,
              settlementNumber: 'TEST2',
              from: 1556402400000,
              to: 1558908000000
            }
          ],
          count: 3,
          hasNext: true
        });
      } else {
        return of({
          list: [
            {
              id: 3,
              employeeId: 'employee',
              brutto: 2000,
              netto: 1712.0,
              incomeCosts: 400.0,
              tax: 288.0,
              hours: 80,
              salary: 25,
              settlementNumber: 'TEST3',
              from: 1556402400000,
              to: 1558908000000
            }
          ],
          count: 3,
          hasNext: false
        });
      }
    } else {
      //assume page size == 2
      if (pageableFilterDTO.pageNumber == 0) {
        return of({
          list: [
            {
              id: 1,
              employeeId: 'employee',
              brutto: 2000,
              netto: 1712.0,
              incomeCosts: 400.0,
              tax: 288.0,
              hours: 80,
              salary: 25,
              settlementNumber: 'TEST1',
              from: 1556402400000,
              to: 1558908000000
            },
            {
              id: 2,
              employeeId: 'employee',
              brutto: 2000,
              netto: 1712.0,
              incomeCosts: 400.0,
              tax: 288.0,
              hours: 80,
              salary: 25,
              settlementNumber: 'TEST2',
              from: 1556402400000,
              to: 1558908000000
            }
          ],
          count: 3,
          hasNext: true
        });
      } else {
        return of({
          list: [
            {
              id: 3,
              employeeId: 'employee',
              brutto: 2000,
              netto: 1712.0,
              incomeCosts: 400.0,
              tax: 288.0,
              hours: 80,
              salary: 25,
              settlementNumber: 'TEST3',
              from: 1556402400000,
              to: 1558908000000
            }
          ],
          count: 3,
          hasNext: false
        });
      }
    }
  }

  mapDateToTimestamp(bill: CreateBillDTO): CreateBillDTO {
    return { settlementNumber: bill.settlementNumber, to: bill.to.valueOf(), from: bill.from.valueOf() };
  }

  mapTimestampToDate(bill: BillDTO) {
    return { ...bill, from: new Date(bill.from), to: new Date(bill.to) };
  }
}
