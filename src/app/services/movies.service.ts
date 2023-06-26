import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Years } from '../interfaces/years.interfaces';
import { BehaviorSubject, Observable, Subject, catchError, debounceTime, delay, map, of, switchMap } from 'rxjs';
import { MinMaxInterval } from '../interfaces/intervals.interfaces';
import { Studios } from '../interfaces/studios.interfaces';
import { Movie } from '../interfaces/movies.interfaces';

interface SearchResult {
  movies: Movie[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchYear: number | '';
  searchWinner: boolean | '';
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private heroesUrl = 'https://tools.texoit.com/backend-java/api/movies';

  private projection = [
    'years-with-multiple-winners',
    'studios-with-win-count',
    'max-min-win-interval-for-producers'
  ]

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _search$ = new Subject<void>();
  private _movies$ = new BehaviorSubject<Movie[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 15,
    searchYear: '',
    searchWinner: '',
  };

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        debounceTime(300),
        switchMap(() => this._search()),
        delay(200),
      )
      .subscribe((result) => {
        this._movies$.next(result.movies);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get movies$() {
    return this._movies$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }

  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchYear() {
    return this._state.searchYear;
  }
  get searchWinner() {
    return this._state.searchWinner;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchYear(searchYear: number | '') {
    this._set({ searchYear });
  }

  set searchWinner(searchWinner: boolean | '') {
    this._set({ searchWinner });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {

    const { pageSize, page, searchWinner, searchYear } = this._state;

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page - 1);
    queryParams = queryParams.append("size", pageSize);

    if (typeof searchWinner == "boolean") queryParams = queryParams.append("winner", searchWinner);

    if (searchYear) queryParams = queryParams.append("year", searchYear);

    return this.http.get<any>(`${this.heroesUrl}`, { params: queryParams }).pipe(
      map(response => { return { movies: response.content, total: response.totalElements } })
    )
  }

  getYearsWithMultipleWinners(): Observable<Years[]> {
    return this.http.get<any>(`${this.heroesUrl}/?projection=${this.projection[0]}`).pipe(
      map(response => {
        return response.years
      },
        catchError(this.handleError<Years[]>('getYears', []))
      ))
  }

  getStudiosWithMostWins(): Observable<Studios[]> {
    return this.http.get<any>(`${this.heroesUrl}/?projection=${this.projection[1]}`).pipe(
      map(response => {
        return response.studios
      },
        catchError(this.handleError<Years[]>('getStudios', []))
      ))
  }

  getMaxMinIntervalProducers(): Observable<MinMaxInterval> {
    return this.http.get<any>(`${this.heroesUrl}/?projection=${this.projection[2]}`).pipe(
      catchError(this.handleError<MinMaxInterval>('getIntervals', { min: [], max: [] }))
    );
  }

  getWinnersByYear(year: string): Observable<Movie[]> {
    return this.http.get<any>(`${this.heroesUrl}?winner=true&year=${year}`).pipe(
      catchError(this.handleError<Movie[]>('getWinners', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
