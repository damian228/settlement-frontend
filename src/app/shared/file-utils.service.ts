import { ElementRef, Injectable } from '@angular/core';
import { FileDTO } from '@app/shared/dto';
import { Constants } from '@app/shared/constants';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class FileUtilsService {
  constructor(private toastr: ToastrService) {}

  downloadFile(file: FileDTO, attachmentEl: ElementRef) {
    const fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
    let fileType;
    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      fileType = Constants.FILE_TYPE_JPG;
    } else if (fileExtension === 'pdf') {
      fileType = Constants.FILE_TYPE_PDF;
    } else {
      this.toastr.error('Unsupported file extension: ' + fileExtension);
      return;
    }
    attachmentEl.nativeElement.href = fileType + file.content;
    attachmentEl.nativeElement.download = file.name;
    attachmentEl.nativeElement.click();
  }
}
