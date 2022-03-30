import { NgModule } from '@angular/core';
import { PractitionerSearchService } from './services/practitioner-search.service';
import { SearchFacadeService } from './services/search-facade.service';
import { PatientSearchService } from './services/patient-search.service';
import { AbstractSearchFacadeService } from './services/abstract-search-facade.service';
@NgModule({
  providers: [
    PractitionerSearchService,
    PatientSearchService,
    { provide: AbstractSearchFacadeService, useClass: SearchFacadeService },
  ],
  bootstrap: [],
})
export class SearchModule {}
