import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  /** https://restcountries.com */
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) { }

  public searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`);
  }

}
