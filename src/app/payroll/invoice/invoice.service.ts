import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDTO, InvoiceDetailsDTO, ListChunk, PageableFilterDTO } from '@app/shared/dto';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  getAttachment(id: number): Observable<FileDTO> {
    return this.httpClient.get(`/payroll/invoice/${id}/attachment`).pipe(map((file: FileDTO) => file));
  }

  getInvoice(id: number): Observable<InvoiceDetailsDTO> {
    return this.httpClient.get(`/payroll/invoice/${id}/show`).pipe(map((invoice: InvoiceDetailsDTO) => invoice));
  }

  markInvoiceProcessed(id: number): Observable<Object> {
    return this.httpClient.put(`/payroll/invoice/${id}/mark-processed`, null);
  }

  getActive(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<InvoiceDetailsDTO>> {
    return this.httpClient
      .skipErrorHandler()
      .post('/payroll/invoice/actual', pageableFilterDTO)
      .pipe(map((response: ListChunk<InvoiceDetailsDTO>) => response));
  }

  getArchived(pageableFilterDTO: PageableFilterDTO): Observable<ListChunk<InvoiceDetailsDTO>> {
    return this.httpClient
      .post('/payroll/invoice/archived', pageableFilterDTO)
      .pipe(map((response: ListChunk<InvoiceDetailsDTO>) => response));
  }
}
