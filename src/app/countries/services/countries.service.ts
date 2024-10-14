import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries';
import { CacheStore } from '../interfaces/cache-store.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  /** https://restcountries.com */
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore  = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { term: '', countries: [] }
  };

  constructor(
    private http: HttpClient
  ) { }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map((countries) => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  public searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`)
    .pipe(
      tap((countries) => this.cacheStore.byCapital = { term, countries })
    )
  }

  public searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`);
  }

  public searchRegion(region: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        // delay(2000)
      );
  }

}
