import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HoursDTO } from '@app/shared/dto';

@Component({
  selector: 'app-dialog-add-hours',
  templateUrl: './dialog-add-hours.html',
  styleUrls: ['./dialog-add-hours.scss']
})
export class DialogAddHours {
  @ViewChild('hourInput') hourInput: ElementRef;
  @ViewChild('projectInput') projectInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogAddHours>, @Inject(MAT_DIALOG_DATA) public data: HoursDTO) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.hourInput.nativeElement.validity.valid && this.projectInput.nativeElement.validity.valid;
  }
}
