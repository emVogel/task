import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUnicornTableColumn } from '../models';
import { IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';
import { MatDialog } from '@angular/material/dialog';
import { IDialogData } from '../models';
import { DialogDetailViewComponent } from '../dialog-detail-view/dialog-view.component';

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

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(data: IFhirPatient | IFhirPractitioner): void {
    console.log(data);
    const dialogRef = this.dialog.open(DialogDetailViewComponent, {
      width: 'auto',
      data: { label: [], details: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
