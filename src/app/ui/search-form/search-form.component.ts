import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FhirSearchFn, ISearchFormData } from '@red-probeaufgabe/types';
import { debounceTime, filter } from 'rxjs/operators';
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
  }

  public ngOnInit(): void {
    this.nameField.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => !this.nameField.invalid),
      )
      .subscribe(() => {
        const term = {
          searchText: this.nameField.value,
          searchFuncSelect: this.searchForm.get('searchFuncSelect').value,
        };
        this.onSearch.emit(term);
      });
  }

  public isEmpty(): boolean {
    return this.nameField.value === '' || this.nameField.value === null;
  }

  public reset(): void {
    this.nameField.reset('', { emitEvent: false });
  }

  /**
   * emits the search term
   */
  public submitSearchString(): void {
    const val: ISearchFormData = this.searchForm.value;
    console.log('form', this.searchForm.value);
    this.onSearch.emit(val);
  }
}
