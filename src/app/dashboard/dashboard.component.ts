import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, startWith, tap, takeUntil, switchMap } from 'rxjs/operators';
import { SiteTitleService } from '@red-probeaufgabe/core';
import {
  FhirSearchFn,
  IFhirPatient,
  IFhirPractitioner,
  IFhirSearchResponse,
  ISearchFormData,
} from '@red-probeaufgabe/types';
import { IUnicornTableColumn } from '@red-probeaufgabe/ui';
import { SearchFacadeService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);
  isLoading = true;

  public search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>>;

  public entries$: Observable<Array<IFhirPatient | IFhirPractitioner>>;

  public totalLength$: Observable<number>;

  public results$: Observable<Array<IFhirPatient | IFhirPractitioner>>;
  private _filter$: BehaviorSubject<ISearchFormData> = new BehaviorSubject<ISearchFormData>({
    searchText: '',
    searchFuncSelect: FhirSearchFn.SearchAll,
  });

  private _destroy$: Subject<never> = new Subject<never>();
  public ngOnInit(): void {
    /*
     * Implement search on keyword or fhirSearchFn change
     **/
    this.search$ = this._filter$.pipe(
      takeUntil(this._destroy$),
      switchMap((filterTerm: ISearchFormData) =>
        this.searchFacade.search(filterTerm?.searchFuncSelect || FhirSearchFn.SearchAll, filterTerm.searchText).pipe(
          catchError(this.handleError),
          tap((data) => {
            this.isLoading = false;
          }),
          shareReplay(),
        ),
      ),
    );

    this.entries$ = this.search$.pipe(
      map((data) => !!data && data.entry),
      startWith([]),
    );

    this.totalLength$ = this.search$.pipe(
      map((data) => !!data && data.total),
      startWith(0),
    );
  }

  // the abstract class was inject from which the service inherits
  constructor(private siteTitleService: SiteTitleService, private searchFacade: SearchFacadeService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._filter$.complete();
  }

  public filterTable(filterTerm: ISearchFormData): void {
    this._filter$.next(filterTerm);
  }

  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return of({ entry: [], total: 0 });
  }
}
