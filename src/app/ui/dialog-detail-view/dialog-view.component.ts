import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../models';

@Component({
  selector: 'app-detail-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss'],
})
export class DialogDetailViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {}

  public get isPatientView(): boolean {
    return this.data.detail.resourceType === 'Patient';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
