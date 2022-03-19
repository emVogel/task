import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FhirSearchFn, ISearchFormData } from '@red-probeaufgabe/types';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, startWith } from 'rxjs/operators';
/**
 * the type for dropdown select ui
 */
type ResourceType = {
  label: string;
  value: FhirSearchFn;
};

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public searchForm: FormGroup;
  public searchAll = FhirSearchFn.SearchAll;
  public resources: ResourceType[] = [
    { label: 'Patients + Practitioners', value: FhirSearchFn.SearchAll },
    { label: 'Patients', value: FhirSearchFn.SearchPatients },
    { label: 'Practitioners', value: FhirSearchFn.SearchPractitioners },
  ];

  @Output() onSearch: EventEmitter<ISearchFormData> = new EventEmitter<ISearchFormData>();

  public nameField: FormControl;
  public selectField: FormControl;
  constructor(private _fb: FormBuilder) {
    const searchStringValidator = (control: AbstractControl): { [key: string]: unknown } => {
      const reg = /[äÄÖöÜü]/;

      if (!control.value || control.value === '') {
        return null;
      }

      if (control.value?.includes(' ')) {
        return { invalidSearchStringEmptySpace: true };
      }
      if (reg.test(control.value)) {
        return { invalidSerachStringForbiddenLetters: true };
      }

      return null;
    };

    this.searchForm = this._fb.group({
      searchText: ['', searchStringValidator],
      searchFuncSelect: [],
    });

    this.nameField = this.searchForm.get('searchText') as FormControl;
    this.selectField = this.searchForm.get('searchFuncSelect') as FormControl;
  }

  public ngOnInit(): void {
    // watching changes for searchField
    const searchField$: Observable<string> = this.nameField.valueChanges.pipe(
      debounceTime(500),
      filter(() => !this.nameField.invalid),
    );
    // watching changes for selectField
    const selectField$: Observable<FhirSearchFn> = this.selectField.valueChanges.pipe(
      startWith(FhirSearchFn.SearchAll),
    );

    combineLatest([searchField$, selectField$]).subscribe(([searchTerm, searchFuncSelect]) => {
      this.onSearch.emit({
        searchText: searchTerm,
        searchFuncSelect: searchFuncSelect,
      });
    });
  }

  public isEmpty(): boolean {
    return this.nameField.value === '' || this.nameField.value === null;
  }

  public reset(): void {
    this.nameField.reset('', { emitEvent: false });
  }

  /**
   * emits the search term by click
   */
  public submitSearchString(): void {
    const val: ISearchFormData = this.searchForm.value;
    this.onSearch.emit(val);
  }
}
