import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  countries$: Observable<string[]>;
  form = this.formBuilder.group({
    name: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
  ) {
    this.countries$ = this.form.get('name')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      filter((name) => !!name),
      switchMap(name => this.countryService.getByName(name))
    );
  }
}
