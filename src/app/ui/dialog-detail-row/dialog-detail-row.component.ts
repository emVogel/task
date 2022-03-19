import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-detail-row',
  templateUrl: './dialog-detail-row.component.html',
  styleUrls: ['./dialog-detail-row.component.scss'],
})
export class DialogDetailRowComponent {
  @Input() label = '';
  @Input() data = '';
}
