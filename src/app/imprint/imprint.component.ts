import { Component } from '@angular/core';
import { SiteTitleService } from '@red-probeaufgabe/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {
  constructor(private siteTitleService: SiteTitleService) {
    this.siteTitleService.setSiteTitle('Imprint');
  }
}
