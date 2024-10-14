import { Component, NgModule, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private countriesSrv: CountriesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countriesSrv.cacheStore.byCountry.countries;
    this.initialValue = this.countriesSrv.cacheStore.byCountry.term;
  }

  searchByCountry(term: string): void{
    this.isLoading = true;
    this.countriesSrv.searchCountry(term)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
