import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries';
import { CacheStore } from '../interfaces/cache-store.interfaces';
import { Region } from '../interfaces/region.type';

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
  ) {
    this.loadFromLocalStorage();
  }

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
      tap((countries) => this.cacheStore.byCapital = { term, countries }),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`)
    .pipe(
      tap((countries) => this.cacheStore.byCountry = { term, countries }),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`)
    .pipe(
      tap((countries) => this.cacheStore.byRegion = { term: region, countries }),
      tap(() => this.saveToLocalStorage())
    );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        // delay(2000)
      );
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStore')) { return; }
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

}
