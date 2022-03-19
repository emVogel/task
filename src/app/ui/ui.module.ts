import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GridContainerComponent } from './grid-container/grid-container.component';
import { UnicornTableComponent } from './unicorn-table/unicorn-table.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { DialogDetailRowComponent } from './dialog-detail-row/dialog-detail-row.component';
import { DialogDetailViewComponent } from './dialog-detail-view/dialog-view.component';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    CdkLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatRippleModule,
    MatDialogModule,
  ],
  declarations: [
    SidenavComponent,
    NavListComponent,
    ToolbarComponent,
    GridContainerComponent,
    UnicornTableComponent,
    DialogDetailRowComponent,
    DialogDetailViewComponent,
    SearchFormComponent,
  ],
  exports: [
    // Components
    SidenavComponent,
    NavListComponent,
    ToolbarComponent,
    GridContainerComponent,
    UnicornTableComponent,
    DialogDetailRowComponent,
    DialogDetailViewComponent,
    SearchFormComponent,

    // Modules
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatIconModule,
  ],
})
export class UiModule {}
