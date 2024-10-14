import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor(
    private countriesSrv: CountriesService
  ) { }

  searchByRegion(region: Region): void{
    this.selectedRegion = region;
    this.countriesSrv.searchRegion(region)
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

}
