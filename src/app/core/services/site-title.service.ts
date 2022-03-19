import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteTitleService {
  private siteTitle$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private titleService: Title) {}

  setSiteTitle(title: string) {
    this.titleService.setTitle(title);
    this.siteTitle$.next(title);
  }

  getSiteTitleObserver() {
    return this.siteTitle$.asObservable();
  }
}
