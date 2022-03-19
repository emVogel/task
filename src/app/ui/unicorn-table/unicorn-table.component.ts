import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUnicornTableColumn } from '../models';
import { FhirResourceType, IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';
import { MatDialog } from '@angular/material/dialog';
import { IDialogData, IPatientDetailData, PatientLabel, PractitionerLabel } from '../models';
import { DialogDetailViewComponent } from '../dialog-detail-view/dialog-view.component';
import { FhirUtilService } from '../../search';
@Component({
  selector: 'app-unicorn-table',
  templateUrl: './unicorn-table.component.html',
  styleUrls: ['./unicorn-table.component.scss'],
})
export class UnicornTableComponent implements OnInit {
  dataSource: MatTableDataSource<IFhirPatient | IFhirPractitioner> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>();
  @Input() totalLength = 0;
  @Input() isLoading = false;

  @Input()
  set entries(value: Array<IFhirPatient | IFhirPractitioner>) {
    this.dataSource.data = value;
  }

  constructor(public dialog: MatDialog, private _fHirUtilService: FhirUtilService) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(data: IFhirPatient | IFhirPractitioner): void {
    const detailData = this._fHirUtilService.getDetailData(data);
    const isPatient = detailData.resourceType === FhirResourceType.Patient;
    const labels = this._fHirUtilService.getLabels(isPatient);

    const dialogData: IDialogData = { label: labels, detail: detailData };

    const dialogRef = this.dialog.open(DialogDetailViewComponent, {
      width: '40%',
      data: dialogData,
    });
  }
}
