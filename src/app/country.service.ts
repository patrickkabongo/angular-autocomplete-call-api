
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

interface Country {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

constructor(
  private readonly http: HttpClient
) { }

  getByName(name: string): Observable<string[]> {
    return this.http
      .get<Country[]>(`https://restcountries.eu/rest/v2/name/${name}`)
      .pipe(map(countryList => countryList.map(({ name }) => name)),
      catchError( (err) => {
          if (err.error.status === 404) {
              return of([`--- No results for: ${name} ---`]);
          }
      }));
  }
}
