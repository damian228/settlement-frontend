import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddInvoiceDTO, FileDTO } from '@app/shared/dto';
import { FileUtilsService } from '@app/shared/file-utils.service';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '@app/employee/invoice/invoice.service';

@Component({
  selector: 'app-dialog-add-invoice',
  templateUrl: './dialog-add-invoice.html',
  styleUrls: ['./dialog-add-invoice.scss']
})
export class DialogAddInvoice {
  isLoading: boolean = false;

  @ViewChild('fileInput') fileInput: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: AddInvoiceDTO,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private fileUtilsService: FileUtilsService
  ) {}

  closeWithoutSave(): void {
    this.toastrService.info('Closed without save');
    this.dialogRef.close();
  }

  onFileSelected() {
    const inputNode = this.fileInput.nativeElement;
    let fileDTO: FileDTO = new FileDTO(inputNode.files[0].name);

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        fileDTO.content = this.fileUtilsService.base64ArrayBuffer(e.target.result);
        this.data.fileDto = fileDTO;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
