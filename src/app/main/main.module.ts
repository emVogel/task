import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';
import { SearchModule } from '@red-probeaufgabe/search';
import { DashboardModule } from '@red-probeaufgabe/dashboard';
import { UiModule } from '@red-probeaufgabe/ui';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, UiModule, DashboardModule, SearchModule],
})
export class MainModule {}
