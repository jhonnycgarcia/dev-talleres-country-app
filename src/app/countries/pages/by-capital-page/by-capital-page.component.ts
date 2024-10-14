import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(
    private countriesSrv: CountriesService
  ) { }

  searchByCapital(term: string): void{
    this.isLoading = true;
    this.countriesSrv.searchCapital(term)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
