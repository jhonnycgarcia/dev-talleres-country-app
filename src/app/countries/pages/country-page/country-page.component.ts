import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesSrv: CountriesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      console.log({id});

      this.countriesSrv.searchCountryByAlphaCode(id)
        .subscribe((countries) => {
          console.log(countries);
        });
    });
  }

}
