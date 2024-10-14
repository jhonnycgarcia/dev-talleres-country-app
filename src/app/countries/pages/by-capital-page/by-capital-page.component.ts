import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private countriesSrv: CountriesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countriesSrv.cacheStore.byCapital.countries;
    this.initialValue = this.countriesSrv.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void{
    this.isLoading = true;
    this.countriesSrv.searchCapital(term)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
