import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-salary',
  templateUrl: './dialog-salary.html',
  styleUrls: ['./dialog-salary.scss']
})
export class DialogSalary implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogSalary>, @Inject(MAT_DIALOG_DATA) public salary: number) {}

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }
}
