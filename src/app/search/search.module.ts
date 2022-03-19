import { NgModule } from '@angular/core';
import { PractitionerSearchService } from './services/practitioner-search.service';
import { SearchFacadeService } from './services/search-facade.service';
import { PatientSearchService } from './services/patient-search.service';

@NgModule({
  providers: [PractitionerSearchService, PatientSearchService, SearchFacadeService],
  bootstrap: [],
})
export class SearchModule {}
