import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(
    private countriesSrv: CountriesService
  ) { }

  searchByRegion(region: string): void{
    this.countriesSrv.searchRegion(region)
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

}
