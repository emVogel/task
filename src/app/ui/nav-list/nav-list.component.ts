import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILink } from '@red-probeaufgabe/types';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
  @Input() links: ILink[];
  @Output() linkClicked: EventEmitter<string> = new EventEmitter();

  onLinkClicked(label: string) {
    this.linkClicked.emit(label);
  }
}
