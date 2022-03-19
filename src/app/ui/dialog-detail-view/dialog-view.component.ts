import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';

export interface DetailData {
  label: string;
  data: IFhirPatient | IFhirPractitioner;
}

@Component({
  selector: 'app-detail-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss'],
})
export class DialogDetailViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
