import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteTitleService } from '@red-probeaufgabe/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  title$: Observable<string> = this.siteTitleService.getSiteTitleObserver();

  menuToolbarTitle = 'Menu';
  sidenavLinks = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Imprint',
      href: '/imprint',
      icon: 'info',
    },
  ];

  constructor(private siteTitleService: SiteTitleService) {}

  onLinkClicked(label: string) {
    this.siteTitleService.setSiteTitle(label);
  }
}
